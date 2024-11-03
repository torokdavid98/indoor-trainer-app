import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import useNotify from '../hooks/useNotify';
import { useAuth } from '../hooks/useAuth';
import { doSwaggerCall } from '../hooks/useApi';
import CommonButton from '../components/atom/CommonButton';
import { ROLES } from '../helpers/constants';
import ModalDialogTitle from './components/ModalDialogTitle';

const TrainingDetailsModal = ({ training, reloadData, showModal, MODAL_TYPE }) => {
    const { notifyError, notifySuccess } = useNotify();
    const { user } = useAuth();

    const [isDeleting, setIsDeleting] = useState(false);

    const afterSave = (msg) => {
        showModal(MODAL_TYPE.NONE);
        notifySuccess(msg);
        reloadData();
    };

    const deleteTraining = async () => {
        try {
            await doSwaggerCall('Trainings', 'deleteTraining', {
                id: training.id,
            });
            afterSave('Training deleted successfully');
            reloadData();
        } catch (error) {
            notifyError(error);
        }
    };

    const saveTraining = async () => {
        try {
            await doSwaggerCall('Trainings', 'updateTrainingList', { id: training.id });
            afterSave(training.saved_training ? 'Training unsaved' : 'Training saved');
        } catch (error) {
            notifyError(error);
        }
    };

    return (
        <Dialog
            open
            fullWidth
            maxWidth="lg"
            onClose={() => {
                showModal(MODAL_TYPE.NONE);
            }}
        >
            <ModalDialogTitle
                id="training-details-modal"
                title="Training details"
                onClose={() => showModal(MODAL_TYPE.NONE)}
            />
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{training.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">{`${training.length} minutes`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">{training.description}</Typography>
                    </Grid>
                    {/* // TODO */}
                    {/* <Grid item xs={12}>
                        <Typography variant="body1">{training.workout}</Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Typography variant="body1">{training.type}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">{`Created by: ${training.created_by}`}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <CommonButton
                    label={training.saved_training ? 'Unsave training' : 'Save training'}
                    onClick={() => {
                        saveTraining();
                    }}
                />
                {user.role === ROLES.ADMIN && !isDeleting && (
                    <IconButton onClick={() => setIsDeleting(true)}>
                        <DeleteIcon color="primary" />
                    </IconButton>
                )}
            </DialogActions>
            {isDeleting && (
                <Box
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, .85)',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box textAlign="center">
                        <Typography variant="h6">
                            Are you sure you want to delete this training?
                        </Typography>
                        <br />
                        <CommonButton
                            label="Cancel"
                            buttonType="text"
                            onClick={() => setIsDeleting(false)}
                        />
                        &nbsp;&nbsp;
                        <CommonButton
                            onClick={() => {
                                deleteTraining();
                            }}
                            label="Delete training"
                        />
                    </Box>
                </Box>
            )}
        </Dialog>
    );
};

export default TrainingDetailsModal;
