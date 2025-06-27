import { Grid } from '@mui/material';
import { Logo } from '../../ui';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <Grid
            container
            spacing={0}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: '4',
            }}
        >
            <Logo variant='h3' sx={{ mb: 8 }} />

            <Grid
                className='box-shadow'
                size={{ xs: 9, sm: 6, md: 4, lg: 3 }}
                sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
            >
                <Outlet />
            </Grid>
        </Grid>
    );
};
