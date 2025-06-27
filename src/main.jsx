import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles.css';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppTheme>
            <AppRouter />
        </AppTheme>
    </Provider>
);
