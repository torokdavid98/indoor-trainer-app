import { TableCell } from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function SortIndicator({ arrow }) {
    if (arrow === 'ASC') {
        return <ArrowDropUpIcon />;
    }
    if (arrow === 'DESC') {
        return <ArrowDropDownIcon />;
    }
    return null;
}

function SortableTableCell({
    arrow,
    children,
    onClick,
    justifyContent = '', // optional prop to handle some cases where need to align the header of the table
    ...props
}) {
    return (
        <TableCell style={{ cursor: 'pointer' }} onClick={onClick} {...props} align="center">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent }}>
                {children}
                <SortIndicator arrow={arrow} />
            </div>
        </TableCell>
    );
}

export default SortableTableCell;
