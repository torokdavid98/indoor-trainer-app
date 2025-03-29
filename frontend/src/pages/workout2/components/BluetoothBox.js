import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';
import { connect } from '../../workout/helpers/bluetooth';

const BluetoothBox = () => {
    const [device, setDevice] = useState(null);

    return (
        <Paper
            elevation={2}
            sx={{
                padding: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {device ? (
                    <BluetoothConnectedIcon color="success" sx={{ marginRight: 1 }} />
                ) : (
                    <BluetoothIcon sx={{ marginRight: 1 }} />
                )}
                <Typography variant="body1">
                    {device ? `Connected: ${device.name} (${device.id})` : 'Not Connected'}
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={async () => {
                    const dev = await connect();
                    setDevice(dev);
                }}
                disabled={!!device}
            >
                {device ? 'Connected' : 'Connect'}
            </Button>
        </Paper>
    );
};

export default BluetoothBox;
