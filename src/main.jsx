import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles.css';
import { JournalApp } from './JournalApp';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <JournalApp />
        </Provider>
    </StrictMode>
);
