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

function EditTrainingModal({ showModal, MODAL_TYPE, training = null, reloadData }) {
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
                    workout: [{}], // TODO
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
            <DialogTitle>{`${newTraining ? 'Add' : 'Edit'} Training`}</DialogTitle>
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
                                            label="Title"
                                            type="text"
                                            value={values.name}
                                            onChange={(ev) =>
                                                setFieldValue('name', ev.target.value)
                                            }
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name ? errors.name : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            type="text"
                                            multiline
                                            value={values.description}
                                            onChange={(ev) =>
                                                setFieldValue('description', ev.target.value)
                                            }
                                            error={
                                                touched.description && Boolean(errors.description)
                                            }
                                            helperText={
                                                touched.description ? errors.description : ''
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Workout length"
                                            type="number"
                                            value={values.length}
                                            onChange={(ev) =>
                                                setFieldValue('length', ev.target.value)
                                            }
                                            error={touched.length && Boolean(errors.length)}
                                            helperText={touched.length ? errors.length : ''}
                                            InputProps={{
                                                inputProps: {
                                                    min: 1,
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        minutes
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="type">Training type</InputLabel>
                                            <Select
                                                labelId="type"
                                                label="Training type"
                                                value={values.type}
                                                onChange={(e) => {
                                                    setFieldValue('type', e.target.value);
                                                }}
                                            >
                                                <MenuItem value="recovery">Recovery</MenuItem>
                                                <MenuItem value="interval">Interval</MenuItem>
                                                <MenuItem value="race">Race</MenuItem>
                                                <MenuItem value="long_distance">
                                                    Long distance
                                                </MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* Wattage Table */}
                                    <Grid item xs={12}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Minutes</TableCell>
                                                    <TableCell>Required Watts</TableCell>
                                                    <TableCell width="10%" />
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {wattageEntries.map((entry, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={entry.minutes}
                                                                onChange={(e) => {
                                                                    const newEntries = [
                                                                        ...wattageEntries,
                                                                    ];
                                                                    newEntries[index].minutes =
                                                                        e.target.value;
                                                                    setWattageEntries(newEntries);
                                                                }}
                                                                type="number"
                                                                InputProps={{
                                                                    inputProps: {
                                                                        min: 1,
                                                                    },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            minutes
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={entry.watts}
                                                                onChange={(e) => {
                                                                    const newEntries = [
                                                                        ...wattageEntries,
                                                                    ];
                                                                    newEntries[index].watts =
                                                                        e.target.value;
                                                                    setWattageEntries(newEntries);
                                                                }}
                                                                type="number"
                                                                InputProps={{
                                                                    inputProps: {
                                                                        min: 1,
                                                                    },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            watts
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <IconButton
                                                                fullWidth
                                                                onClick={() =>
                                                                    handleDeleteWattageEntry(index)
                                                                }
                                                                color="secondary"
                                                            >
                                                                <DeleteIcon color="primary" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={2} />
                                                    <TableCell align="right">
                                                        <IconButton onClick={handleAddWattageEntry}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
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
                                disabled={isSubmitting || !(isValid && dirty)}
                                type="submit"
                                label="Submit"
                                buttonType="primary"
                            />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default EditTrainingModal;
