import { Navigate } from 'react-router-dom';
import { JournalPage } from '../pages';

export const JournalRoutes = [
    {
        index: true,
        element: <JournalPage />,
    },
    {
        path: '/*',
        element: <Navigate to='/' />,
    },
];
