import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, Tooltip, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Field } from 'formik';

const FormikPasswordInput = ({ name, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <Grid item xs={12}>
            <Field name={name}>
                {({ field, meta }) => (
                    <TextField
                        {...field}
                        {...props}
                        error={meta.error && meta.touched}
                        helperText={meta.touched && meta.error}
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={`Jelszó ${
                                            showPassword ? 'elrejtése' : 'megjelenítése'
                                        }`}
                                    >
                                        <IconButton
                                            onClick={handleToggleShowPassword}
                                            edge="end"
                                            disableRipple
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <RemoveRedEyeIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            </Field>
        </Grid>
    );
};

export default FormikPasswordInput;
