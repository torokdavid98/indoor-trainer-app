import { Box, Grid, LinearProgress } from '@mui/material';
import React from 'react';
import TrainingCard from './TrainingCard';

const CardList = ({ trainings, loading, reloadData }) => {
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
                    <TrainingCard key={training.id} training={training} reloadData={reloadData} />
                ))
            )}
        </Grid>
    );
};

export default CardList;
