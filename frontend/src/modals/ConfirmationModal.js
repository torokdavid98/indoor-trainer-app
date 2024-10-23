import React from 'react';
import {
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Dialog,
    Alert,
} from '@mui/material';
import CommonButton from '../components/atom/CommonButton';

const ConfirmationModal = ({
    title,
    content,
    confirm,
    warningContent = false,
    showModal,
    MODAL_TYPE,
}) => {
    const closeAction = () => showModal(MODAL_TYPE.NONE);
    return (
        <Dialog
            open
            onClose={closeAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                {warningContent && (
                    <DialogContentText id="alert-dialog-warning">
                        <Alert sx={{ mt: 0.5 }} severity="warning">
                            {warningContent}
                        </Alert>
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <CommonButton
                    onClick={closeAction}
                    autoFocus
                    label="Mégsem"
                    buttonType="secondary"
                />
                <CommonButton
                    onClick={() => {
                        confirm();
                        showModal(MODAL_TYPE.NONE);
                    }}
                    label="Igen"
                    buttonType="primary"
                />
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
