import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const PowerBox = () => {
    return (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Power</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">Current Watt:</Typography>
                <Typography variant="h5">
                    <b>230 W</b> <b style={{ color: 'black' }}>/ 290 W</b>
                </Typography>
            </Box>
        </Paper>
    );
};

export default PowerBox;
