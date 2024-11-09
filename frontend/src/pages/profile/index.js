import React, { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { doSwaggerCall } from '../../hooks/useApi';
import useNotify from '../../hooks/useNotify';
import { useAuth } from '../../hooks/useAuth';
import ComponentTitle from '../../components/atom/ComponentTitle';
import CommonButton from '../../components/atom/CommonButton';
import TwoFactorSettings from './TwoFactorSettings';

function ProfilePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const { notifyError, notifySuccess } = useNotify();
    const [twoFactorSecret, setTwoFactorSecret] = useState(null);
    const [twoFactorChanged, setTwoFactorChanged] = useState(false);

    const loadUser = useCallback(() => {
        setLoading(true);
        doSwaggerCall('Users', 'getMe', {})
            .then((res) => {
                setData({
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    // profile_picture: res.profile_picture,
                });
                setTwoFactorSecret(res.two_factor_secret);
                setLoading(false);
                setTwoFactorChanged(false);
            })
            .catch((err) => {
                setLoading(false);
                setTwoFactorChanged(false);
                notifyError(err);
            });
    }, [setData, setLoading, notifyError]);

    useEffect(() => {
        loadUser();
    }, [twoFactorChanged]);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            await doSwaggerCall(
                'Users',
                'editMe',
                {},
                {
                    name: values.name,
                    email: values.email,
                    profile_picture: null,
                }
            );
            loadUser();
            setSubmitting(false);
            notifySuccess('User profile updated');
        } catch (err) {
            notifyError(err);
            setSubmitting(false);
        }
    };

    // const requestDeletion = () => {
    //     showModal(MODAL_TYPE.CONFIRMATION, {
    //         title: 'Request account deletion',
    //         content: 'Are you sure you want to request the deletion of your account?',
    //         warningContent: 'This action may takes time to delete your account.',
    //         confirm: () => {
    //             doSwaggerCall('Users', 'requestAccountDeletion', {})
    //                 .then(() => {
    //                     notifySuccess('Account deletion requested');
    //                 })
    //                 .catch((error) => {
    //                     notifyError(error);
    //                 });
    //         },
    //     });
    // };

    if (loading) {
        return true;
    }

    const validateSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
    });

    return (
        <Formik onSubmit={onSubmit} initialValues={data} validationSchema={validateSchema}>
            {({ isSubmitting, values, setFieldValue, touched, errors, dirty }) => (
                <Form>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={6}>
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Paper sx={{ p: 2, mt: 2 }}>
                                    <Grid container>
                                        <Grid item>
                                            <ComponentTitle variant="h4" title="Profile" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                autoComplete="off"
                                                name="name"
                                                value={values.name}
                                                onChange={(ev) =>
                                                    setFieldValue('name', ev.target.value)
                                                }
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name ? errors.name : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                autoComplete="off"
                                                label="Email"
                                                value={values.email}
                                                disabled
                                            />
                                        </Grid>
                                        {/* <UploadImageInput
                                            value={values?.profile_picture}
                                            setFieldValue={setFieldValue}
                                            isProfile
                                            picture="profile_picture"
                                        /> */}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <CommonButton
                                    fullWidth
                                    disabled={isSubmitting || !dirty}
                                    type="submit"
                                    label="Save"
                                    buttonType="primary"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <Paper sx={{ p: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">
                                                Two-factor authentication
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TwoFactorSettings
                                                userId={user.id}
                                                twoFactorSecret={twoFactorSecret}
                                                setTwoFactorChanged={setTwoFactorChanged}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default ProfilePage;
