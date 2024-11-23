const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const { isProd } = require('../config');
const mailConfig = require('../config').nodemail;
const { siteUrl } = require('../config').url;

function validateEmail(email) {
    if (!email) {
        return false;
    }

    if (email.length > 254) {
        return false;
    }

    const tester =
        /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const valid = tester.test(email);
    if (!valid) {
        return false;
    }

    const parts = email.split('@');
    if (parts[0].length > 64) {
        return false;
    }

    const domainParts = parts[1].split('.');
    if (domainParts.some((part) => part.length > 63)) {
        return false;
    }

    return true;
}

module.exports.validateEmail = validateEmail;

async function sendEmail(email) {
    const transporter = nodemailer.createTransport({
        host: mailConfig.nodemailHost,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mailConfig.nodemailUser,
            pass: mailConfig.nodemailPass,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: {
            name: mailConfig.nodemailSenderName, // sender name
            address: mailConfig.nodemailSender, // sender address
        },
        // to: 'email.to', // list of receivers
        to: email.to, // list of receivers
        subject: email.subject, // Subject line
        // text: email.text, // plain text body
        html: email.html, // html body
        cc: email.cc || [], // list of cc
    });
}

module.exports.sendEmail = sendEmail;

async function render(template, params, opts = {}) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(
            path.join(__dirname, `../views/mails/${template}.ejs`),
            params,
            opts,
            (err, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(body);
            }
        );
    });
}

module.exports.render = render;

function splitEmailTextToList(emailText) {
    let ret = [];
    if (typeof emailText === 'string') {
        ret = emailText
            .split(',')
            .map((e) => e.trim())
            .filter(validateEmail);
    }
    return ret;
}

module.exports.splitEmailTextToList = splitEmailTextToList;

async function composeAndSendEmail(
    models,
    client,
    template,
    templateParams,
    toList,
    subject,
    userId,
    needCC = false
) {
    // handle null defaults from DB
    let emailToList = toList === null ? [] : toList;

    // if the toList is a string, break it down with ','
    if (typeof emailToList === 'string') {
        emailToList = splitEmailTextToList(emailToList);
    }

    // make the TO list unique
    emailToList = [...new Set(emailToList.map((e) => e.trim()).filter(validateEmail))];

    // site url for link
    const url = isProd ? siteUrl : 'http://localhost:3000/';

    const html = await render(template, {
        ...templateParams,
        // push down some generic fields to templates
        client,
        subject,
        url,
    });
    // convert html to plain text (remove html tags)
    const text = html.replace(/<[^>]*>?/gm, '');
    // console.log('html', html);
    // console.log('text', text);

    if (!needCC) {
        for (let i = 0; i < emailToList.length; i++) {
            const to = emailToList[i];
            const email = {
                to,
                subject,
                html,
            };

            const logItem = await models.EmailLogs.create({
                user_id: userId,
                to,
                subject,
                html,
                ejs: JSON.stringify({ template, templateParams, client }),
                options: JSON.stringify({
                    ...email,
                    // clear html from OPTIONS
                    html: '',
                }),
            });

            try {
                console.log(`Sending email to: ${to} - ${subject}`);
                await sendEmail(email);
                await logItem.update({
                    result: 'success',
                });
            } catch (err) {
                //  there was some problem with the email sending
                await logItem.update({
                    result: err.toString(),
                });
            }
        }
    } else {
        // send email for each contact (to first contact, cc others)
        const to = emailToList[0];
        const cc = emailToList.slice(1);
        const email = {
            to,
            subject,
            html,
            cc,
        };

        const logItem = await models.EmailLogs.create({
            user_id: userId,
            to,
            subject,
            html,
            ejs: JSON.stringify({ template, templateParams, client }),
            options: JSON.stringify({
                ...email,
                // clear html from OPTIONS
                html: '',
            }),
        });

        try {
            console.log(`Sending email to: ${to} (cc: ${cc}) - ${subject}`);
            await sendEmail(email);
            await logItem.update({
                result: 'success',
            });
        } catch (err) {
            // there was some problem with the email sending
            await logItem.update({
                result: err.toString(),
            });
        }
    }
}

module.exports.composeAndSendEmail = composeAndSendEmail;

async function resendEmail(models, emaillog) {
    const { html, user_id, to, subject, ejs, options } = emaillog;

    const logItem = await models.EmailLogs.create({
        user_id,
        to,
        subject,
        html,
        ejs,
        options,
    });

    const email = {
        to,
        subject,
        html,
    };

    try {
        console.log(`Resending email to: ${to} - ${subject}`);
        await sendEmail(email);
        await logItem.update({
            result: 'success',
        });
    } catch (err) {
        // there was some problem with the email sending
        await logItem.update({
            result: err.toString(),
        });
    }
}

module.exports.resendEmail = resendEmail;
