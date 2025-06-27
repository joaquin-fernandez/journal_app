import { CircularProgress, Grid } from '@mui/material';

export const CheckingAuth = () => {
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
            <Grid
                className='box-shadow'
                sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
            >
                <CircularProgress color='secondary' />
            </Grid>
        </Grid>
    );
};
