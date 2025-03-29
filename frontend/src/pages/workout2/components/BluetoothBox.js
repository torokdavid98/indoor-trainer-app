import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';

const BluetoothBox = () => {
    const [connectedDevice, setConnectedDevice] = useState(null);

    const handleConnect = () => {
        setConnectedDevice({ name: 'Power Meter', id: 'Elite TUO' });
    };

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
                {connectedDevice ? (
                    <BluetoothConnectedIcon color="success" sx={{ marginRight: 1 }} />
                ) : (
                    <BluetoothIcon sx={{ marginRight: 1 }} />
                )}
                <Typography variant="body1">
                    {connectedDevice
                        ? `Connected: ${connectedDevice.name} (${connectedDevice.id}
                  )`
                        : 'Not Connected'}
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleConnect}
                disabled={!!connectedDevice}
            >
                {connectedDevice ? 'Connected' : 'Connect'}
            </Button>
        </Paper>
    );
};

export default BluetoothBox;
