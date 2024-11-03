import { useCallback, useState } from 'react';

export default function useSorting(defaultSorting) {
    const [defaultSort = 'created_at', defaultSortDir = 'ASC'] = defaultSorting ?? [];
    const [sort, setSort] = useState(defaultSort);
    const [sortDir, setSortDir] = useState(defaultSortDir);

    const setSorting = useCallback(
        (newSort) => {
            if (sort === newSort) {
                setSortDir((dir) => (dir === 'ASC' ? 'DESC' : 'ASC'));
            } else {
                setSort(newSort);
            }
        },
        [sort, setSort, setSortDir]
    );

    return { sort, sortDir, setSorting };
}
