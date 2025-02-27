import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import LoginPage from './pages/login/LoginPage';
import ForgotPasswordPage from './pages/login/ForgotPasswordPage';
import { useAuth } from './hooks/useAuth';
import NotFoundPage from './pages/notfound';
import TrainingsPage from './pages/trainings';
import Header from './components/header';
import { ROLES } from './helpers/constants';
import AuditLogsPage from './pages/auditlogs';
import MyTrainingsPage from './pages/mytrainings';
import ProfilePage from './pages/profile';
import WorkoutPage from './pages/workout';

function PageForEveryone({ children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/" />;
    return children;
}

function PageForAdminsOnly({ children }) {
    const { user } = useAuth();
    if (!user || user.role !== ROLES.ADMIN) return <Navigate to="/" />;
    return children;
}

function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, pt: 12 }}>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" exact element={<LoginPage />} />
                        <Route path="/forgotpassword" exact element={<ForgotPasswordPage />} />
                        <Route
                            path="/trainings"
                            element={
                                <PageForEveryone>
                                    <TrainingsPage />
                                </PageForEveryone>
                            }
                        />
                        <Route
                            path="/mytrainings"
                            element={
                                <PageForEveryone>
                                    <MyTrainingsPage />
                                </PageForEveryone>
                            }
                        />
                        <Route
                            path="/auditlogs"
                            element={
                                <PageForAdminsOnly>
                                    <AuditLogsPage />
                                </PageForAdminsOnly>
                            }
                        />
                        <Route
                            path="/user/me/"
                            element={
                                <PageForEveryone>
                                    <ProfilePage />
                                </PageForEveryone>
                            }
                        />
                        <Route
                            path="/mytrainings"
                            element={
                                <PageForEveryone>
                                    <MyTrainingsPage />
                                </PageForEveryone>
                            }
                        />
                        <Route
                            path="/workout/:trainingId"
                            element={
                                <PageForEveryone>
                                    <WorkoutPage />
                                </PageForEveryone>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Container>
            </Box>
        </Box>
    );
}

export default App;
