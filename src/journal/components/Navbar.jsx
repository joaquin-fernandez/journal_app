import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { Logo } from '../../ui';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';

export const Navbar = ({ drawerWidth = 240, toggleDrawer }) => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    };

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { md: 'none' } }}
                    onClick={toggleDrawer}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid
                    container
                    size={12}
                    direction='row'
                    justifyContent='space-between'
                >
                    <Logo variant='h6' sx={{ width: '158px', m: 1 }} />

                    <IconButton
                        color='inherit'
                        edge='end'
                        sx={{ width: 50, height: 50 }}
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
