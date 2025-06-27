import { Alert, Grid } from '@mui/material';

export const AlertNotification = ({
    errorMessage,
    severity = 'error',
    variant = 'filled',
    sx = { mb: 4 },
}) => {
    return (
        <Grid display={errorMessage ? '' : 'none'} size={12}>
            <Alert variant={variant} severity={severity} sx={sx}>
                {errorMessage}
            </Alert>
        </Grid>
    );
};
