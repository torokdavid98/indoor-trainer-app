import React, { useEffect } from 'react';
import { DialogActions, DialogContent, Grid, Alert, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import FormikInput from '../../components/atom/FormikInput';
import { doSwaggerCall } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import ComponentTitle from '../../components/atom/ComponentTitle';
import formatErrorToString from '../../helpers/formatErrorToString';
import { MODAL_TYPE, useModals } from '../../hooks/useModal';
import CommonButton from '../../components/atom/CommonButton';

const navigateUrl = '/dashboard';

function LoginPage() {
    const { showModal } = useModals();
    const navigate = useNavigate();
    const { user, setUser, setAccessToken } = useAuth();

    useEffect(() => {
        if (!user) {
            return;
        }
        navigate(navigateUrl);
    }, [user]);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={6}>
                <Paper sx={{ p: 1 }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={({ email, password }, { setSubmitting, setErrors }) => {
                            doSwaggerCall('Auth', 'login', {}, { email, password })
                                .then((data) => {
                                    if (!data.user) {
                                        setErrors({ api: data.message });
                                        return;
                                    }
                                    const { token, ...otherUserData } = data.user;
                                    setUser(otherUserData);
                                    setAccessToken(token);
                                    navigate(navigateUrl);
                                    showModal(MODAL_TYPE.NONE);
                                })
                                .catch((error) => {
                                    // check if error is 409 and two factor show modal
                                    if (error.response.status === 409) {
                                        showModal(MODAL_TYPE.TWO_FACTOR_AUTH, {
                                            title: `Two factor authentication`,
                                            content: 'Please enter your one time password:',
                                            email,
                                            password,
                                        });
                                    } else if (error?.response?.obj?.userId) {
                                        // need two factor authentication registration, show modal with qr code
                                        const { userId, secret, qrCodeUrl } = error.response.obj;
                                        showModal(MODAL_TYPE.TWO_FACTOR_AUTH, {
                                            title: `Two factor authentication`,
                                            content:
                                                'Two factor authentication is required to sign in. Please scan the QR code with your authenticator app.',
                                            email,
                                            password,
                                            userId,
                                            secret,
                                            qrCodeUrl,
                                        });
                                    } else {
                                        setErrors({
                                            api: formatErrorToString(error),
                                        });
                                    }
                                })
                                .then(() => setSubmitting(false));
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <DialogContent>
                                    <Grid container>
                                        <Grid item>
                                            <ComponentTitle variant="h4" title="Sign-in" />
                                        </Grid>
                                        {errors?.api && (
                                            <Grid item container xs={12} alignItems="center">
                                                <Grid item xs={12}>
                                                    <Alert severity="error">{errors?.api}</Alert>
                                                </Grid>
                                            </Grid>
                                        )}
                                        <FormikInput
                                            sm={12}
                                            name="email"
                                            label="Email"
                                            required
                                            type="email"
                                        />
                                        <FormikInput
                                            sm={12}
                                            name="password"
                                            label="Password"
                                            required
                                            type="password"
                                        />
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <CommonButton
                                        onClick={() => {
                                            navigate('/forgotpassword');
                                        }}
                                        label="Forgot password?"
                                        buttonType="text"
                                    />
                                    <CommonButton
                                        type="submit"
                                        label="Sign in"
                                        buttonType="primary"
                                    />
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default LoginPage;
