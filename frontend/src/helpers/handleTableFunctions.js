export const handlePageChange = (newPage, setParams, limit) => {
    setParams({ page: newPage, limit });
};

export const handleChangeRowsPerPage = (event, setParams) => {
    setParams({ limit: parseInt(event.target.value, 10), page: 0 });
};
