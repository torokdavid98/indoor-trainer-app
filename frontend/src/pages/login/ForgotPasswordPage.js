import React, { useState } from 'react';
import { DialogActions, DialogContent, Grid, Alert, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormikInput from '../../components/atom/FormikInput';
import { doSwaggerCall } from '../../hooks/useApi';
import useNotify from '../../hooks/useNotify';
import ComponentTitle from '../../components/atom/ComponentTitle';
import CommonButton from '../../components/atom/CommonButton';

function ForgotPasswordPage() {
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();
    const { notifyError, notifySuccess } = useNotify();

    const onSubmit = async (values) => {
        try {
            await doSwaggerCall(
                'Auth',
                'resetPasswordRequest',
                {},
                {
                    email: values.email,
                }
            );
            setEmailSent(true);
            notifySuccess('Email sent');
            navigate('/');
        } catch (error) {
            notifyError(error);
            setEmailSent(false);
        }
    };

    const validateSchema = Yup.object().shape({
        email: Yup.string().email().required('Required'),
    });

    return (
        <Grid container justifyContent="center">
            <Grid item xs={6}>
                <Paper sx={{ p: 1 }}>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validateSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, dirty }) => (
                            <Form>
                                <DialogContent>
                                    <Grid container>
                                        <Grid item>
                                            <ComponentTitle variant="h4" title="Forgot password?" />
                                        </Grid>
                                        {emailSent && (
                                            <Grid item xs={12}>
                                                <Alert>Password reset sent.</Alert>
                                            </Grid>
                                        )}
                                        <FormikInput
                                            sm={12}
                                            label="Email"
                                            type="email"
                                            name="email"
                                        />
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <CommonButton
                                        onClick={() => {
                                            navigate('/');
                                        }}
                                        label="Cancel"
                                        buttonType="text"
                                    />
                                    <CommonButton
                                        disabled={isSubmitting || !dirty}
                                        label="Request password reset email"
                                        buttonType="primary"
                                        type="submit"
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

export default ForgotPasswordPage;
