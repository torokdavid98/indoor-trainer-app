import { Grid, Typography } from '@mui/material';
import React from 'react';

const ComponentTitle = ({ variant, title, ...otherProps }) => {
    return (
        <Grid item xs={12}>
            <Typography variant={variant} {...otherProps}>
                {title}
            </Typography>
        </Grid>
    );
};

export default ComponentTitle;
