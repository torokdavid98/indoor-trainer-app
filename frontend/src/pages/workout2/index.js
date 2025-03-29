import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useParams } from 'react-router-dom';
import PageWithTitle from '../../components/atom/PageWithTitle';
import DetailsBox from './components/DetailsBox';
import PowerBox from './components/PowerBox';
import SpeedBox from './components/SpeedBox';
import BluetoothBox from './components/BluetoothBox';
import useNotify from '../../hooks/useNotify';
import { doSwaggerCall } from '../../hooks/useApi';

const WorkoutPage2 = () => {
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

    if (loading) {
        return (
            <PageWithTitle title="Workout">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        Loading...
                    </Grid>
                </Grid>
            </PageWithTitle>
        );
    }

    return (
        <PageWithTitle title={`Workout / ${training?.name}`}>
            <Grid item xs={12} sx={{ marginBottom: 0 }}>
                {training?.description && (
                    <Typography variant="caption">{training?.description}</Typography>
                )}
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 0.5, width: '120px' }}
                    >
                        <PauseIcon />
                    </Button>
                    <Button variant="contained" color="error">
                        <StopIcon />
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <PowerBox />
                </Grid>
                <Grid item xs={6}>
                    <SpeedBox />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DetailsBox />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BluetoothBox />
                </Grid>
            </Grid>
        </PageWithTitle>
    );
};

export default WorkoutPage2;
