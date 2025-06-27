import {CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from './primaryTheme';

export const AppTheme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
