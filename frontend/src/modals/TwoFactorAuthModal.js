import React, { useEffect, useState } from 'react';
import {
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Dialog,
    Alert,
    TextField,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toDataURL } from 'qrcode';
import { useAuth } from '../hooks/useAuth';
import useNotify from '../hooks/useNotify';
import { doSwaggerCall } from '../hooks/useApi';
import formatErrorToString from '../helpers/formatErrorToString';
import CommonButton from '../components/atom/CommonButton';
import OneTimePasswordInput from '../pages/profile/OneTimePasswordInput';

const TwoFactorAuthModal = ({
    title,
    content,
    email,
    password,
    userId,
    secret,
    qrCodeUrl,
    showModal,
    MODAL_TYPE,
}) => {
    const closeAction = () => showModal(MODAL_TYPE.NONE);
    const { setUser, setAccessToken } = useAuth();
    const navigate = useNavigate();
    const { notifyError, notifySuccess } = useNotify();
    const [oneTimePassword, setOneTimePassword] = useState('');
    const [error, setError] = useState('');
    const [qrDataUrl, setQrDataUrl] = useState(null);

    useEffect(() => {
        if (!qrCodeUrl) {
            return;
        }
        toDataURL(qrCodeUrl)
            .then((url) => {
                setQrDataUrl(url);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [qrCodeUrl]);

    const save = (oneTimePasswordParam, secretParam) => {
        doSwaggerCall(
            'Auth',
            'login',
            {},
            { email, password, oneTimePassword: oneTimePasswordParam, secret: secretParam }
        )
            .then((data) => {
                if (!data.user) {
                    setError(formatErrorToString(data.message));
                    return;
                }
                const { token, ...otherUserData } = data.user;
                setUser(otherUserData);
                setAccessToken(token);
                navigate('/trainings');
                showModal(MODAL_TYPE.NONE);
                if (secret) {
                    notifySuccess('Two factor authentication registration successful!');
                }
            })
            .catch((err) => {
                setError(formatErrorToString(err));
                notifyError(err);
            });
    };

    return (
        <Dialog
            open
            onClose={closeAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {error && (
                    <DialogContentText id="alert-dialog-error">
                        <Alert sx={{ mt: 0.5 }} severity="error">
                            {error}
                        </Alert>
                    </DialogContentText>
                )}
                <DialogContentText id="alert-dialog-description" sx={{ pt: 1, pb: 1 }}>
                    {content}
                </DialogContentText>
                {userId ? (
                    <OneTimePasswordInput
                        oneTimePassword={oneTimePassword}
                        setOneTimePassword={setOneTimePassword}
                        qrDataUrl={qrDataUrl}
                        secret={secret}
                        saveFunction={save}
                    />
                ) : (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            label="One Time Password"
                            value={oneTimePassword}
                            onChange={(ev) => setOneTimePassword(ev.target.value)}
                        />
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                {!userId && (
                    <>
                        <CommonButton
                            onClick={closeAction}
                            autoFocus
                            label="Cancel"
                            buttonType="secondary"
                        />
                        <CommonButton
                            onClick={() => {
                                save(oneTimePassword);
                            }}
                            label="Send"
                            buttonType="primary"
                        />
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default TwoFactorAuthModal;
