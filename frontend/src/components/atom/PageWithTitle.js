import { Grid } from '@mui/material';
import React from 'react';
import ComponentTitle from './ComponentTitle';

const DEFAULT_HEADLINE_ITEMS = [];
function PageWithTitle({ children, title, headline = DEFAULT_HEADLINE_ITEMS }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" spacing={0}>
                    <Grid item>
                        <ComponentTitle variant="h4" title={title} />
                    </Grid>
                    <Grid item>{headline}</Grid>
                </Grid>
            </Grid>
            {children}
        </Grid>
    );
}

export default PageWithTitle;
