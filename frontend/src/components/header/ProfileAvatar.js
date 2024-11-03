import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks/useAuth';

function ProfileAvatar() {
    const navigate = useNavigate();
    const { logoutUser, user } = useAuth();

    const [toggleProfile, setToggleProfile] = useState(null);
    const open = Boolean(toggleProfile);

    const id = open ? 'profile-popover' : undefined;

    const popoverStyle = {
        '& .MuiPaper-root': {
            borderRadius: 1,
            marginTop: 0,
            borderTopWidth: 1,
        },
    };

    return (
        <>
            <Avatar onClick={(e) => setToggleProfile(e.currentTarget)}>
                {user?.name?.substr(0, 1)?.toUpperCase()}
            </Avatar>
            <Popover
                id={id}
                open={open}
                anchorEl={toggleProfile}
                onClose={() => setToggleProfile(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={popoverStyle}
            >
                <List>
                    <MenuItem
                        onClick={() => {
                            navigate('/user/me');
                            setToggleProfile(null);
                        }}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>My profile</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onClick={() => {
                            logoutUser();
                            setToggleProfile(null);
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Log out</ListItemText>
                    </MenuItem>
                </List>
            </Popover>
        </>
    );
}

export default ProfileAvatar;
