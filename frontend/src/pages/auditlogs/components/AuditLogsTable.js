import React, { useState } from 'react';
import {
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SkeletonTable from '../../../components/atom/SkeletonTable';
import { AUDIT_LOG_DESCRIPTIONS, TABLE_ROW_COUNT_OPTIONS } from '../../../helpers/constants';
import { handleChangeRowsPerPage, handlePageChange } from '../../../helpers/handleTableFunctions';
import SortableTableCell from '../../../components/atom/SortableTableCell';

const AuditLogsTable = ({
    rows,
    limit,
    page,
    setParams,
    total,
    loading,
    sort,
    sortDir,
    setSorting,
}) => {
    const [expandedRows, setExpandedRows] = useState([]);

    const handleExpandClick = (rowIndex) => {
        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((row) => row !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

    const getLogDescription = (logType) => {
        const logDescription = AUDIT_LOG_DESCRIPTIONS[logType] || 'Unknown log type';
        return logDescription;
    };

    return (
        <Grid item xs={12}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User name</TableCell>
                        <SortableTableCell
                            arrow={sort === 'log_type' ? sortDir : ''}
                            onClick={() => setSorting('log_type')}
                        >
                            Log type
                        </SortableTableCell>
                        <SortableTableCell
                            arrow={sort === 'created_at' ? sortDir : ''}
                            onClick={() => setSorting('created_at')}
                        >
                            Created
                        </SortableTableCell>
                        <TableCell>Log data</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <SkeletonTable rows={limit} cells={5} />
                    ) : (
                        rows?.map((row, index) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    <TableCell>{row.user_name || '-'}</TableCell>
                                    <TableCell>{row.log_type}</TableCell>
                                    <TableCell>
                                        {new Date(row.created_at).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {expandedRows.includes(index) ? (
                                            <pre>{JSON.stringify(row.log_data, null, 2)}</pre>
                                        ) : (
                                            getLogDescription(row.log_type)
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            title={
                                                !expandedRows.includes(index)
                                                    ? 'Expand for detailed version.'
                                                    : 'Close for brief version.'
                                            }
                                            placement="top"
                                        >
                                            <IconButton onClick={() => handleExpandClick(index)}>
                                                {!expandedRows.includes(index) ? (
                                                    <ExpandMore />
                                                ) : (
                                                    <ExpandLess />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))
                    )}
                </TableBody>
            </Table>
            <TablePagination
                count={total || 0}
                rowsPerPage={limit}
                component="div"
                page={page}
                onPageChange={(_, newPage) => handlePageChange(newPage, setParams, limit)}
                rowsPerPageOptions={TABLE_ROW_COUNT_OPTIONS}
                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setParams)}
            />
        </Grid>
    );
};

export default AuditLogsTable;
