import { Button, Grid, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { doSwaggerCall } from '../../hooks/useApi';
import useNotify from '../../hooks/useNotify';
import { TABLE_ROW_COUNT_DEFAULT, TABLE_ROW_COUNT_OPTIONS } from '../../helpers/constants';
import useSorting from '../../hooks/useSorting';
import PageWithTitle from '../../components/atom/PageWithTitle';
import SearchInput from '../../components/atom/SearchInput';
import CardList from './components/CardList';
import TablePager from '../../components/atom/TablePager';
import { MODAL_TYPE, useModals } from '../../hooks/useModal';

const TrainingsPage = () => {
    const { notifyError } = useNotify();
    const [{ limit, page }, setParams] = useState({ limit: TABLE_ROW_COUNT_DEFAULT, page: 0 });
    const { sort, sortDir, setSorting } = useSorting(['created_at', 'ASC']);
    const [total, setTotal] = useState(0);
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showModal } = useModals();


    const [search, setSearch] = useState('');

    const getTrainings = async () => {
        setLoading(true);
        try {
            const data = await doSwaggerCall('Trainings', 'getTrainings', {
                offset: page * limit,
                limit,
                search,
                sort,
                sortDir,
            });
            setTrainings(data.trainings);
            setTotal(data.total);
            setLoading(false);
        } catch (error) {
            notifyError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTrainings();
    }, [page, limit, sort, sortDir, search]);

    return (
        <PageWithTitle title="Trainings">
            <Grid container item xs={12} direction="row" alignItems="flex-end" sx={{ mt: 1 }}>
                <Grid item xs={1}>
                    <Tooltip title="Create Training">
                        <Button
                            fullWidth
                            onClick={() => {
                                showModal(MODAL_TYPE.EDIT_TRAINING, {
                                    training: null,
                                    reloadData: getTrainings,
                                });
                            }}
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={11}>
                    <SearchInput
                        search={search}
                        setSearch={setSearch}
                        setParams={setParams}
                        limit={limit}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CardList trainings={trainings} loading={loading} reloadData={getTrainings} />
            </Grid>
            <TablePager
                page={page}
                onPageChange={(_, newPage) => setParams((p) => ({ ...p, page: newPage }))}
                count={total}
                rowsPerPage={limit}
                rowsPerPageOptions={TABLE_ROW_COUNT_OPTIONS}
                onRowsPerPageChange={(event) => setParams({ page: 0, limit: event.target.value })}
            />
        </PageWithTitle>
    );
};

export default TrainingsPage;
