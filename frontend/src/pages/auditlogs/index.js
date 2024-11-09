import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import useNotify from '../../hooks/useNotify';
import AuditLogsTable from './components/AuditLogsTable';
import useSorting from '../../hooks/useSorting';
import PageWithTitle from '../../components/atom/PageWithTitle';
import { TABLE_ROW_COUNT_DEFAULT } from '../../helpers/constants';

const AuditLogsPage = () => {
    const [{ limit, page }, setParams] = useState({ limit: TABLE_ROW_COUNT_DEFAULT, page: 0 });
    const { sort, sortDir, setSorting } = useSorting(['created_at', 'DESC']);
    const { notifyError } = useNotify();
    const [data, loading, error] = useApi('Logs', 'getAuditLogs', {
        limit,
        offset: page * limit,
        sort,
        sortDir,
    });

    useEffect(() => {
        if (error) {
            notifyError(error);
        }
    }, [error, notifyError]);

    return (
        <PageWithTitle title="Audit logs">
            <AuditLogsTable
                rows={data?.auditlogs}
                limit={limit}
                page={page}
                setParams={setParams}
                total={data?.total}
                loading={loading}
                sort={sort}
                sortDir={sortDir}
                setSorting={setSorting}
            />
        </PageWithTitle>
    );
};

export default AuditLogsPage;
