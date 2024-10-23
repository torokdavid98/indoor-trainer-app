import { Button } from '@mui/material';
import React from 'react';

const checkButton = (buttonType) => {
    switch (buttonType) {
        case 'primary':
            return { variant: 'contained', color: 'primary' };
        case 'secondary':
            return { variant: 'outlined', color: 'red' };
        case 'text':
            return { variant: 'text', color: 'primary' };
        default:
            return { variant: 'contained', color: 'primary' };
    }
};

const CommonButton = ({
    buttonType = 'primary', // primary | secondary | text
    sx,
    style,
    onClick,
    type,
    disabled,
    fullWidth,
    autoFocus,
    label,
}) => {
    const { variant, color } = checkButton(buttonType);

    const customStyle = {
        ...style,
        color,
    };

    return (
        <Button
            variant={variant}
            sx={sx}
            style={customStyle}
            type={type}
            onClick={onClick}
            fullWidth={fullWidth}
            disabled={disabled}
            autoFocus={autoFocus}
        >
            {label}
        </Button>
    );
};

export default CommonButton;
