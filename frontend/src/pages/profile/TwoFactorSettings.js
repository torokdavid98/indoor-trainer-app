import { Alert, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toDataURL } from 'qrcode';
import useNotify from '../../hooks/useNotify';
import { doSwaggerCall, useApi } from '../../hooks/useApi';
import { MODAL_TYPE, useModals } from '../../hooks/useModal';
import OneTimePasswordInput from './OneTimePasswordInput';
import CommonButton from '../../components/atom/CommonButton';

const TwoFactorRegistration = ({ userId, setTwoFactorChanged }) => {
    const { notifyError, notifySuccess } = useNotify();
    const [oneTimePassword, setOneTimePassword] = useState('');
    const [qrDataUrl, setQrDataUrl] = useState(null);
    const [data, loading, error] = useApi('Auth', 'generateQRCode', {
        userId,
    });
    if (error) {
        notifyError(error);
    }

    const twoFactorRegistration = (oneTimePasswordParam) => {
        doSwaggerCall(
            'Auth',
            'saveQRCode',
            {},
            {
                secret: data.secret,
                oneTimePassword: oneTimePasswordParam,
            }
        )
            .then(() => {
                setTwoFactorChanged(true);
                notifySuccess('Two factor authentication registration successful!');
            })
            .catch((err) => {
                setTwoFactorChanged(false);
                notifyError(err);
            });
    };

    useEffect(() => {
        if (!data?.qrCodeUrl) {
            return;
        }
        toDataURL(data.qrCodeUrl)
            .then((url) => {
                setQrDataUrl(url);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [data?.qrCodeUrl]);

    return loading ? (
        <Grid item xs={12}>
            <CircularProgress size="1.5rem" />
        </Grid>
    ) : (
        <OneTimePasswordInput
            oneTimePassword={oneTimePassword}
            setOneTimePassword={setOneTimePassword}
            qrDataUrl={qrDataUrl}
            saveFunction={twoFactorRegistration}
        />
    );
};

const TwoFactorExistingSettings = ({ userId, setTwoFactorChanged }) => {
    const { notifyError, notifySuccess } = useNotify();
    const { showModal } = useModals();
    const twoFactorReset = () => {
        doSwaggerCall('Auth', 'resetTwoFactorAuth', { userId })
            .then(() => {
                setTwoFactorChanged(true);
                notifySuccess('Two factor authentication registration removed!');
            })
            .catch((err) => {
                setTwoFactorChanged(false);
                notifyError(err);
            });
    };

    return (
        <>
            <Grid item xs={12}>
                <Alert sx={{ mt: 1 }} severity="warning">
                    If you remove your two factor authentication registration, you will need to
                    register again to use it.
                </Alert>
            </Grid>
            <Grid item xs={12} textAlign="center" sx={{ p: 2 }}>
                <CommonButton
                    onClick={() => {
                        showModal(MODAL_TYPE.CONFIRMATION, {
                            title: `Are you sure you want to remove registrated two factor authentication?`,
                            content: 'This action is irreversible.',
                            confirm: () => twoFactorReset(),
                        });
                    }}
                    label="Remove registration"
                    buttonType="secondary"
                />
            </Grid>
        </>
    );
};

const TwoFactorSettings = ({ userId, twoFactorSecret, setTwoFactorChanged }) => {
    return twoFactorSecret ? (
        <TwoFactorExistingSettings userId={userId} setTwoFactorChanged={setTwoFactorChanged} />
    ) : (
        <TwoFactorRegistration userId={userId} setTwoFactorChanged={setTwoFactorChanged} />
    );
};

export default TwoFactorSettings;
