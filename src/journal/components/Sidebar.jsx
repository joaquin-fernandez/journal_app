import { useSelector } from 'react-redux';
import {
    Divider,
    Drawer,
    Grid,
    List,
    Toolbar,
    Typography,
} from '@mui/material';
import { SidebarItem } from './SidebarItem';

export const Sidebar = ({
    drawerWidth,
    isOpen,
    isGreaterThanMediumBreakpoint,
    toggleDrawer,
}) => {
    const { displayName } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.journal);

    const onClickItem = () => {
        if (isOpen && isGreaterThanMediumBreakpoint) return;
        toggleDrawer();
    };

    return (
        <Grid
            component='nav'
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
            <Drawer
                variant={
                    isGreaterThanMediumBreakpoint ? 'permanent' : 'temporary'
                }
                open={isOpen}
                onClose={toggleDrawer}
                sx={{
                    display: {
                        xs: isGreaterThanMediumBreakpoint ? 'none' : 'block',
                        md: isGreaterThanMediumBreakpoint ? 'block' : 'none',
                    },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {notes.map((note) => (
                        <SidebarItem
                            key={note.id}
                            note={note}
                            onClickItem={onClickItem}
                        />
                    ))}
                </List>
            </Drawer>
        </Grid>
    );
};
