import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { AuthContextProvider } from './hooks/useAuth';
import { ModalContextProvider } from './hooks/useModal';
import theme from './theme';

const CustomThemeProvider = ({ children }) => {
    const customTheme = theme();
    return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};

const Providers = ({ children }) => {
    return (
        <CustomThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                    <SnackbarProvider>
                        <AuthContextProvider>
                            <ModalContextProvider>{children}</ModalContextProvider>
                        </AuthContextProvider>
                    </SnackbarProvider>
                </QueryParamProvider>
            </BrowserRouter>
        </CustomThemeProvider>
    );
};

export default Providers;
