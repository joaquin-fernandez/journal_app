import { Grid, Typography } from '@mui/material';

export const Logo = ({ variant, sx }) => {
    return (
        <Grid
            container
            sx={sx}
            size={12}
            direction='row'
            justifyContent='center'
        >
            <Typography
                variant={variant}
                sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                }}
            >
                {'>Journal_App:'}
            </Typography>
            <Typography
                variant={variant}
                className='blink'
                sx={{
                    color: 'white',
                    fontFamily: 'monospace',
                }}
            >
                |
            </Typography>
        </Grid>
    );
};
