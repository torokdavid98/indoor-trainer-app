import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import LoginPage from './pages/login/LoginPage';
import ForgotPasswordPage from './pages/login/ForgotPasswordPage';

function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box component="main" sx={{ flexGrow: 1, pt: 12 }}>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" exact element={<LoginPage />} />
                        <Route path="/forgotpassword" exact element={<ForgotPasswordPage />} />
                    </Routes>
                </Container>
            </Box>
        </Box>
    );
}

export default App;
