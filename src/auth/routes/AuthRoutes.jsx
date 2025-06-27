import { LoginPage, RegisterPage } from '../pages';
import { Navigate } from 'react-router-dom';

export const AuthRoutes = [
    {
        index: true,
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'register',
        element: <RegisterPage />,
    },
    {
        path: '*',
        element: <Navigate to={'/auth/login'} />,
    },
];
