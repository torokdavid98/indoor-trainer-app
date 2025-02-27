import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { doSwaggerCall } from '../../hooks/useApi';
import useNotify from '../../hooks/useNotify';
import PageWithTitle from '../../components/atom/PageWithTitle';
import { connect, disconnect } from './helpers/bluetooth';

const BluetoothComponent = () => {
    const [device, setDevice] = useState(null);

    console.log('device', device);

    const startSimulation = async () => {
        if (device) {
            const info = await device.fitnessMachineControlPointCharacteristic.startNotifications(
                device.indoorBikeDataCharacteristic
            );
            console.log('info', info);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h2>Bluetooth</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        const dev = await connect();
                        setDevice(dev);
                    }}
                >
                    Connect
                </Button>
            </Grid>
            {device && (
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            await disconnect(device);
                            setDevice(null);
                        }}
                    >
                        Disconnect
                    </Button>
                </Grid>
            )}
            {device && (
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={startSimulation}>
                        Start Simulation
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

const WorkoutPage = () => {
    const { notifyError } = useNotify();
    const { trainingId } = useParams();
    const [loading, setLoading] = useState(true);
    const [training, setTraining] = useState(null);

    useEffect(() => {
        const getTraining = async () => {
            setLoading(true);
            try {
                const data = await doSwaggerCall('Trainings', 'getTraining', { id: trainingId });
                setTraining(data);
            } catch (error) {
                notifyError(error);
            } finally {
                setLoading(false);
            }
        };
        getTraining();
    }, [trainingId, notifyError]);

    return (
        <PageWithTitle title="Trainings">
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2>{training?.name}</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <BluetoothComponent />
                    </Grid>
                </Grid>
            )}
        </PageWithTitle>
    );
};

export default WorkoutPage;
