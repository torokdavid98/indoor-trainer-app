import React from 'react';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ModalDialogTitle({ title, onClose, props }) {
    return (
        <DialogTitle
            {...props}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: `${title ? 'space-between' : 'end'}`,
            }}
        >
            <Typography variant="h6">{title}</Typography>
            <IconButton aria-label="close" onClick={onClose} style={{ margin: '-6px' }}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
}

export default ModalDialogTitle;
