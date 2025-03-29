import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const SpeedBox = () => {
    return (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Speed</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">Current Speed:</Typography>
                <Typography variant="h5" sx={{ color: 'black' }}>
                    <b>32 km/h</b>
                </Typography>
            </Box>
        </Paper>
    );
};

export default SpeedBox;
