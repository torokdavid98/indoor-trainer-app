import { Alert, Grid, TextField } from '@mui/material';
import React from 'react';
import CommonButton from '../../components/atom/CommonButton';

const OneTimePasswordInput = ({
    oneTimePassword,
    setOneTimePassword,
    qrDataUrl,
    secret,
    saveFunction,
}) => {
    return (
        <>
            <Grid item xs={12}>
                <Alert sx={{ mt: 1, mb: 1 }} severity="info">
                    Please scan the QR code with your authenticator app. If you don&apos;t have one,
                    you can download one of these:
                    <ul>
                        {[
                            {
                                name: 'Google Authenticator',
                                link: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
                            },
                            {
                                name: 'Microsoft Authenticator',
                                link: 'https://apps.apple.com/us/app/microsoft-authenticator/id983156458',
                            },
                            {
                                name: 'Authy',
                                link: 'https://play.google.com/store/apps/details?id=com.authy.authy',
                            },
                        ].map((app) => (
                            <li key={app.name}>
                                <a href={app.link} target="_blank" rel="noreferrer">
                                    {app.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Alert>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <img src={qrDataUrl} alt="QR code" />
            </Grid>
            <Grid item xs={12} sx={{ p: 2 }}>
                <TextField
                    fullWidth
                    label="Please enter the one time password from your authenticator app"
                    value={oneTimePassword}
                    onChange={(ev) => setOneTimePassword(ev.target.value)}
                />
            </Grid>
            <Grid item xs={12} textAlign="center">
                <CommonButton
                    onClick={() =>
                        saveFunction.name === 'twoFactorRegistration'
                            ? saveFunction(oneTimePassword)
                            : saveFunction(oneTimePassword, secret)
                    }
                    disabled={!oneTimePassword}
                    label="Save"
                    buttonType="primary"
                />
            </Grid>
        </>
    );
};

export default OneTimePasswordInput;
