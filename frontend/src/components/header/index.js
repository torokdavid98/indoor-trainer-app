import { IconButton, Toolbar, Grid } from '@mui/material';
import { Menu, ChevronLeft } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { Drawer, DrawerHeader, AppBar } from './Drawer';
import SidebarMenu from './SidebarMenu';
import ProfileAvatar from './ProfileAvatar';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const { user } = useAuth();
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    useEffect(() => {
        setOpen(!!user);
    }, [user]);

    return (
        <>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {user && (
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                mr: 5,
                            }}
                            style={{
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Grid container justifyContent="flex-end">
                        {user && (
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ProfileAvatar />
                            </Grid>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
            {user && (
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeft />
                        </IconButton>
                    </DrawerHeader>
                    <SidebarMenu open={open} />
                </Drawer>
            )}
        </>
    );
};

export default Header;
