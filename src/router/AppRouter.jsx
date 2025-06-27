import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {
    const { status } = useCheckAuth();
    const router = createBrowserRouter(routesConfig({ status }));

    if (status === 'checking') return <CheckingAuth />;

    return <RouterProvider router={router} />;
};
