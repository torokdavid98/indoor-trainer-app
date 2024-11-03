import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Grid container justifyContent="center" alignContent="center" alignItems="center">
            <Grid item xs={5}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h1" align="right">
                            404
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2" align="right">
                            Ooops.. Page not found!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" align="right">
                            <Button onClick={() => navigate('/trainings')} variant="text">
                                Back to home page
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NotFoundPage;
