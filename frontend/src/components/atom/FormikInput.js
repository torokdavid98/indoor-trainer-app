import { Grid, TextField } from '@mui/material';
import { FastField } from 'formik';
import React from 'react';

const FormikInput = ({ name, helperText, xs, sm, ...props }) => (
    <Grid item xs={xs ?? 12} sm={sm ?? 6}>
        <FastField name={name}>
            {({ field, meta }) => (
                <TextField
                    {...field}
                    {...props}
                    error={meta.error && meta.touched}
                    helperText={(meta.touched && meta.error) || helperText}
                    fullWidth
                />
            )}
        </FastField>
    </Grid>
);

export default FormikInput;
