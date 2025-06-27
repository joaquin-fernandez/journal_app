import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{
                minHeight: 'calc(100vh - 98px)',
                backgroundColor: 'white',
                borderRadius: 2,
            }}
            className='animate__animated animate__fadeIn'
        >
            <Grid>
                <StarOutline
                    sx={{
                        fontSize: 100,
                        color: 'secondary.main',
                        backgroundColor: 'primary.main',
                        borderRadius: 100,
                        p: 2,
                    }}
                    className='box-shadow'
                />
            </Grid>
            <Grid>
                <Typography
                    variant='h5'
                    sx={{ color: 'primary.main', mt: 2, fontWeight: 700 }}
                >
                    Selecciona o crea una entrada
                </Typography>
            </Grid>
        </Grid>
    );
};
