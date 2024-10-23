import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikPasswordInput from '../components/atom/FormikPasswordInput';
import { doSwaggerCall } from '../hooks/useApi';
import useNotify from '../hooks/useNotify';
import formatErrorToString from '../helpers/formatErrorToString';
import CommonButton from '../components/atom/CommonButton';

function ResetPasswordModal() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { notifySuccess } = useNotify();

    const changePassword = async (t, password, setSubmitting, setErrors) => {
        setErrors({});
        try {
            await doSwaggerCall(
                'Auth',
                'resetPassword',
                {},
                {
                    token: t,
                    password,
                }
            );
            notifySuccess('Password changed');
            navigate('/dashboard');
        } catch (error) {
            setErrors({ api: formatErrorToString(error) });
        }
        setSubmitting(false);
    };
    useEffect(() => {
        if (token?.length !== 32) {
            navigate('/');
        }
    }, []);

    const validateSchema = Yup.object().shape({
        password: Yup.string().min(6, 'minimum 6 characters').required('Required'),
        confirm: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    return (
        <Dialog aria-labelledby="sign-in-modal" maxWidth="xs" open>
            <DialogTitle>Enter your new password</DialogTitle>
            <Formik
                validationSchema={validateSchema}
                initialValues={{ password: '', confirm: '' }}
                onSubmit={({ password }, { setSubmitting, setErrors }) => {
                    changePassword(token, password, setSubmitting, setErrors);
                }}
            >
                {({ isSubmitting, errors, isValid, dirty }) => (
                    <Form>
                        <DialogContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    {errors.api && <Alert severity="error">{errors.api}</Alert>}
                                    {errors.notMatching && (
                                        <Alert severity="warning">{errors.notMatching}</Alert>
                                    )}
                                </Grid>
                                <FormikPasswordInput name="password" label="New password" />
                                <FormikPasswordInput name="confirm" label="Confirm password" />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <CommonButton
                                type="submit"
                                disabled={isSubmitting || !(isValid && dirty)}
                                label="Change password"
                                buttonType="primary"
                            />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default ResetPasswordModal;
