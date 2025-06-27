import { Grid, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import { useEffect, useState } from 'react';

const drawerWidth = 240;

export const JournalLayout = () => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const isGreaterThanMediumBreakpoint = useMediaQuery(
        theme.breakpoints.up('md')
    );

    useEffect(() => {
        setIsOpen(isGreaterThanMediumBreakpoint);
    }, [isGreaterThanMediumBreakpoint]);

    return (
        <Grid
            container
            direction='row'
            spacing={0}
            className='animate__animated animate__fadeIn'
        >
            <Grid direction='column' container size={12}>
                <Navbar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
                <Toolbar />
                <Grid
                    sx={{
                        width: {
                            md: `calc(100% - ${drawerWidth}px)`,
                            xs: '100%',
                        },
                        ml: { md: `${drawerWidth}px`, xs: 0 },
                        p: 2,
                    }}
                >
                    <Outlet />
                </Grid>
            </Grid>
            <Sidebar
                drawerWidth={drawerWidth}
                isOpen={isOpen}
                isGreaterThanMediumBreakpoint={isGreaterThanMediumBreakpoint}
                toggleDrawer={toggleDrawer}
            />
        </Grid>
    );
};
