const OpenApiValidator = require('express-openapi-validator');
const swaggerWebUi = require('swagger-ui-express');
const express = require('express');

const EXPRESS_HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

/**
 * @param {string} path
 */
function mapPathToExpress(path) {
    const parts = path.split('/');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.startsWith('{') && part.endsWith('}')) {
            // replace braces
            parts[i] = `:${part.slice(1, part.length - 1)}`;
        }
    }

    return parts.join('/');
}

/**
 * Extract parameters from Express request object based on openApi spec
 * @param {e.Request} req
 * @return {{}}
 */
function getOpenApiParams(req) {
    const params = {};

    if (!Array.isArray(req.openapi.schema.parameters)) {
        return params;
    }
    for (const registeredParam of req.openapi.schema.parameters) {
        // Handle req params transform bug https://github.com/cdimascio/express-openapi-validator/issues/372
        const getFrom =
            registeredParam.in === 'path' ? req.openapi.pathParams : req[registeredParam.in];
        params[registeredParam.name] = getFrom[registeredParam.name];
    }

    return params;
}

/**
 * @param {Operation} operation
 * @return {e.RequestHandler}
 */
function wrapOperation(operation) {
    return (req, res, next) => {
        const params = getOpenApiParams(req);
        let user = null;
        if (typeof req.user !== 'undefined') {
            user = req.user;
        }
        let auth0User = null;
        if (typeof req.auth0User !== 'undefined') {
            auth0User = req.auth0User;
        }

        try {
            const returned = operation({ params, data: req.body, user, auth0User, req });

            if (returned instanceof Promise) {
                returned.then((result) => res.json(result)).catch((e) => next(e));
                return;
            }
            res.json(returned);
        } catch (e) {
            next(e);
        }
    };
}

/**
 *
 * @param {Router} router
 * @param {OpenAPIV3.Document} oasDoc
 * @param {Object} operations
 */
function wrapOperations(router, oasDoc, operations) {
    for (const path of Object.keys(oasDoc.paths)) {
        const pathObject = oasDoc.paths[path];
        for (const key of Object.keys(pathObject)) {
            if (!EXPRESS_HTTP_METHODS.includes(key)) {
                continue;
            }

            /** @type {OpenAPIV3.OperationObject} */
            const endpoint = pathObject[key];
            const operation = operations[endpoint.operationId];
            if (typeof operation === 'undefined') {
                throw new Error(`Could not register operation: ${endpoint.operationId}`);
            }

            const handler = wrapOperation(operation);
            router[key](mapPathToExpress(path), handler);
        }
    }
}

/**
 * Register openAPI routes
 * @param {Express} app
 * @param {OpenAPIV3.Document} oasDoc
 * @param {Object} dependencies
 * @param {Object} dependencies.operations
 * @param {Object} dependencies.middleware
 */
function registerOpenAPIRoutes(app, oasDoc, { operations, middleware }) {
    app.use(
        '/docs',
        swaggerWebUi.serve,
        swaggerWebUi.setup(oasDoc, { swaggerOptions: { persistAuthorization: true } })
    );

    app.get('/openapi.json', (req, res) => {
        res.json(oasDoc);
    });

    app.use(
        OpenApiValidator.middleware({
            apiSpec: oasDoc,
            validateResponses: true,
            $refParser: {
                mode: 'dereference',
            },
            validateSecurity: {
                handlers: {
                    ApiKeyAuth: middleware.apiKeyAuth,
                    Auth0ApiKeyAuth: middleware.auth0ApiKeyAuth,
                },
            },
        })
    );

    const apiRouter = express.Router();
    wrapOperations(apiRouter, oasDoc, operations);
    app.use('/1.0', apiRouter);
}

module.exports = registerOpenAPIRoutes;
