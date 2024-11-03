import React, { useState, useEffect } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const SearchInput = ({ search, setSearch, setParams, limit, fullWidth = false }) => {
    const [inputValue, setInputValue] = useState(search);
    const debouncedSearch = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedSearch !== search) {
            if (setParams) {
                setParams({ page: 0, limit });
            }
            setSearch(debouncedSearch);
        }
    }, [debouncedSearch, search, setSearch, setParams, limit]);

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <TextField
            autoFocus
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <CloseIcon
                            size="small"
                            sx={{
                                visibility: inputValue ? 'visible' : 'hidden',
                                cursor: 'pointer',
                            }}
                            onClick={handleClear}
                        />
                    </InputAdornment>
                ),
            }}
            placeholder="Search..."
            value={inputValue || ''}
            size="small"
            onChange={(ev) => {
                setInputValue(ev.target.value);
            }}
            fullWidth={fullWidth}
        />
    );
};

export default SearchInput;
