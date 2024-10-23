import { useCallback, useEffect, useState } from 'react';
import SwaggerClient from 'swagger-client';
import { ACCESS_TOKEN_KEY, BACKEND_URL } from '../config';

let swaggerCache = null;

async function getSwaggerClient() {
    if (swaggerCache === null) {
        swaggerCache = await new SwaggerClient({
            url: `${BACKEND_URL}/openapi.json`,
            authorizations: {},
        });
    }
    return swaggerCache;
}

export async function doSwaggerCall(api, operation, params, body = null) {
    const client = await getSwaggerClient();

    try {
        const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY));
        if (token) {
            client.authorizations.ApiKeyAuth = { value: token };
        } else {
            client.authorizations = {};
        }
    } catch (err) {
        // JSON.parse error
        console.log(err);
    }

    const res = await client.apis[api][operation](params, { requestBody: body });
    return res.body;
}

export function useApi(
    api,
    operation,
    params = {},
    requestBody = null,
    extraDependencies = [],
    mapping = (x) => x
) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [internalReload, setInternalReload] = useState(0);

    const reloadData = useCallback(() => {
        setInternalReload((x) => x + 1);
    }, [setInternalReload]);
    const mappingCallback = useCallback(
        (x) => mapping(x),
        // no dependency, this is just a way to prevent re-renders
        []
    );

    useEffect(() => {
        setLoading(true);

        // to keep the same logic as it was in useGetApiCall
        if (api === false || operation === false) {
            return undefined;
        }
        // cancellation token type of effect handling
        let stillValid = true;

        doSwaggerCall(api, operation, params, requestBody)
            .then((result) => {
                if (!stillValid) {
                    return;
                }
                setData(mappingCallback(result));
                setError(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (!stillValid) {
                    return;
                }
                setData(null);
                setError(err);
                setLoading(false);
            });
        return () => {
            stillValid = false;
        };
    }, [
        api,
        operation,
        mappingCallback,
        // yep, this needs to be the same (in string) to prevent calling it all over again
        JSON.stringify(params),
        JSON.stringify(requestBody),
        // same for extra dependencies
        JSON.stringify(extraDependencies),
        // force reload data
        internalReload,
    ]);

    return [data, loading, error, setData, reloadData];
}
