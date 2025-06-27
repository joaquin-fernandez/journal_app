import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getRoutes } from './Routes';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {
    const { status } = useCheckAuth();

    if (status === 'checking') return <CheckingAuth />;

    const router = createBrowserRouter(getRoutes(status));
    return <RouterProvider router={router} />;
};
