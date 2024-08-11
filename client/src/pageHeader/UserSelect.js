import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import UserContext from '../contexts/UserContext';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function UserSelect() {
    const { user, logout } = useContext(UserContext);

    console.log(user)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (action) => {
        handleClose();
        if (action === 'viewBookings') {
            navigate(`/view-booking`); // Navigate to the bookings page
        } else if (action === 'logout') {
            logout(); // Call logout from UserContext
            navigate('/login'); // Navigate to login page
        } else if (action === 'updateAccount') {
            navigate('/personal-info');
    };
}

    return (
        <React.Fragment>
        <Box>
            <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <AccountCircleIcon sx={{ width: 32, height: 32, color:'#846489' }}/>
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            componentsProps={{
            paper: {
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                display: 'flex', // To enable flexbox for vertical alignment
                flexDirection: 'column', // Stack items vertically
                '& .MuiAccountCircleIcon-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >

            <Divider orientation="vertical" flexItem sx={{  }} />
            <MenuItem onClick={() => handleMenuItemClick('viewBookings')} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontSize: '0.875rem',  // Smaller font size
            }}>
            <EditIcon sx={{ fontSize: 20, mr: 1 }} /> View Bookings
            </MenuItem>
            <Divider orientation="vertical" flexItem sx={{  }} />
            <MenuItem onClick={() => handleMenuItemClick('logout')} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontSize: '0.875rem',  // Smaller font size
            }}>
            <Logout fontSize="small" sx={{ mr: 1}} /> Logout
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}
