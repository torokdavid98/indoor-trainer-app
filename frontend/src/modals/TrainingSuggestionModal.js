import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { doSwaggerCall } from '../hooks/useApi';
import useNotify from '../hooks/useNotify';
import CommonButton from '../components/atom/CommonButton';

function TrainingSuggestionModal({ showModal, MODAL_TYPE, training = null, reloadData }) {
    const { notifySuccess, notifyError } = useNotify();

    const newTraining = !training;
    const [wattageEntries, setWattageEntries] = useState(training?.wattage || []);

    const onSubmit = async (values) => {
        try {
            await doSwaggerCall(
                'Trainings',
                'addTraining',
                {},
                {
                    name: values.name.trim(),
                    description: values.description,
                    length: parseInt(values.length, 10),
                    wattage: wattageEntries, // New field for wattage entries
                    workout: values.workout,
                    type: values.type,
                    shared: values.shared,
                }
            );
            notifySuccess('Training added successfully');
            showModal(MODAL_TYPE.NONE);
            reloadData();
        } catch (error) {
            notifyError(error);
        }
    };

    const validateSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        length: Yup.number().required('Required').min(1, 'Must be at least 1 minute'),
    });

    const handleAddWattageEntry = () => {
        setWattageEntries([...wattageEntries, { minutes: '', watts: '' }]);
    };

    const handleDeleteWattageEntry = (index) => {
        const newEntries = wattageEntries.filter((_, i) => i !== index);
        setWattageEntries(newEntries);
    };

    return (
        <Dialog
            aria-labelledby="add-esg-question-modal"
            open
            maxWidth="md"
            fullWidth
            onClose={() => showModal(MODAL_TYPE.NONE)}
        >
            <DialogTitle>Training Wizard</DialogTitle>
            <Formik
                onSubmit={onSubmit}
                initialValues={
                    training || {
                        name: '',
                        description: '',
                        length: 0,
                        workout: [{}],
                        type: 'recovery',
                        shared: true,
                    }
                }
                validationSchema={validateSchema}
            >
                {({ isSubmitting, values, touched, errors, setFieldValue, isValid, dirty }) => (
                    <Form>
                        <Grid>
                            <DialogContent>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            label="Describe your training"
                                            lines={4}
                                            type="text"
                                            value={values.prompt}
                                            onChange={(ev) =>
                                                setFieldValue('name', ev.target.value)
                                            }
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name ? errors.name : ''}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </Grid>
                        <DialogActions>
                            <CommonButton
                                variant="inherit"
                                onClick={() => showModal(MODAL_TYPE.NONE)}
                                label="Close"
                                buttonType="secondary"
                            />
                            <CommonButton
                                //disabled={isSubmitting || !(isValid && dirty)}
                                type="submit"
                                label="Ask AI"
                                buttonType="primary"
                            />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default TrainingSuggestionModal;
