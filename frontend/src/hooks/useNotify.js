import React, { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import formatErrorToString from '../helpers/formatErrorToString';

const FONT_SIZE = '13px';

export default function useNotify() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
    const notifySuccess = useCallback(
        (message, persist = false) => {
            enqueueSnackbar(message, {
                variant: 'success',
                style: { fontSize: FONT_SIZE },
                persist,
                action: persist
                    ? (key) => {
                          return <Button onClick={() => closeSnackbar(key)}>Close</Button>;
                      }
                    : undefined,
            });
        },
        [enqueueSnackbar, closeSnackbar]
    );
    const notifyInfo = useCallback(
        (message, persist = false) => {
            enqueueSnackbar(message, {
                variant: 'info',
                style: { fontSize: FONT_SIZE },
                persist,
                action: persist
                    ? (key) => {
                          return <Button onClick={() => closeSnackbar(key)}>Close</Button>;
                      }
                    : undefined,
            });
        },
        [enqueueSnackbar, closeSnackbar]
    );
    const notifyError = useCallback(
        (error) => {
            let stringMessage = formatErrorToString(error);
            try {
                if (
                    (error?.response?.obj?.code &&
                        error?.response?.obj?.message ===
                            'Lejárt munkamenet. Kérjük jelentkezzen be.') ||
                    (error?.response?.body?.code &&
                        error?.response?.body?.message ===
                            'Lejárt munkamenet. Kérjük jelentkezzen be.') ||
                    (error?.response?.obj?.code &&
                        error?.response?.obj?.message === 'Érvénytelen jwt token') ||
                    (error?.response?.body?.code &&
                        error?.response?.body?.message === 'Érvénytelen jwt token')
                ) {
                    logoutUser();
                    navigate('/');
                }
            } catch (err) {
                stringMessage = 'Valami hiba történt!';
            }

            enqueueSnackbar(stringMessage, {
                variant: 'error',
                persist: true,
                style: { fontSize: FONT_SIZE },
                action: (key) => {
                    return (
                        <IconButton style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <CloseIcon />
                        </IconButton>
                    );
                },
            });
        },
        [enqueueSnackbar, closeSnackbar]
    );

    return {
        notifySuccess,
        notifyError,
        notifyInfo,
    };
}
