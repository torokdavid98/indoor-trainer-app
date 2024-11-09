import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import MessageIcon from '@mui/icons-material/Message';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../helpers/constants';

function SiderbarMenuItem({ icon, title, open, ...otherProps }) {
    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title={open ? '' : title} placement="right">
                <ListItemButton
                    {...otherProps}
                    sx={{
                        minHeight: 48,
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: 2,
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={title}
                        sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }}
                    />
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
}

export default function SidebarMenu({ open }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const adminRole = user.role && user.role === ROLES.ADMIN;

    return (
        <List style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {user && (
                <SiderbarMenuItem
                    open={open}
                    title="Trainings"
                    icon={<DirectionsBikeIcon />}
                    onClick={() => {
                        navigate('/trainings');
                    }}
                />
            )}
            {adminRole && (
                <SiderbarMenuItem
                    open={open}
                    title="Audit Logs"
                    icon={<MessageIcon />}
                    onClick={() => {
                        navigate('/auditlogs');
                    }}
                />
            )}
        </List>
    );
}
