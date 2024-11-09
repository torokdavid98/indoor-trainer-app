import { Box, Grid, LinearProgress } from '@mui/material';
import React from 'react';
import TrainingCard from './TrainingCard';
import { doSwaggerCall } from '../../../hooks/useApi';
import useNotify from '../../../hooks/useNotify';

const CardList = ({ trainings, loading, reloadData, myTrainings = false }) => {
    const { notifyError, notifySuccess } = useNotify();

    const updateCard = async (training) => {
        try {
            await doSwaggerCall('Trainings', 'updateTrainingList', { id: training.id });
            notifySuccess(training.saved_training ? 'Training unsaved' : 'Training saved');
            if (myTrainings) {
                reloadData();
            }
        } catch (error) {
            notifyError(error);
        }
    };
    return loading ? (
        <Box>
            <LinearProgress variant="indeterminate" />
        </Box>
    ) : (
        <Grid container spacing={2}>
            {trainings.length === 0 ? (
                <Grid item xs={12}>
                    No trainings found
                </Grid>
            ) : (
                trainings.map((training) => (
                    <TrainingCard
                        key={training.id}
                        training={training}
                        reloadData={reloadData}
                        updateCard={updateCard}
                    />
                ))
            )}
        </Grid>
    );
};

export default CardList;
