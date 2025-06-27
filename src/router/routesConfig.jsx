import { useSelector } from 'react-redux';
import { AuthLayout } from '../auth/layout/AuthLayout';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalLayout } from '../journal/layout/JournalLayout';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { Navigate } from 'react-router-dom';

export const routesConfig = ({ status }) => {
    const routes =
        status === 'authenticated'
            ? [
                  {
                      path: '/',
                      element: <JournalLayout />,
                      children: JournalRoutes,
                  },
              ]
            : [
                  {
                      path: '/auth/*',
                      element: <AuthLayout />,
                      children: AuthRoutes,
                  },
                  {
                      path: '/*',
                      element: <Navigate to='/auth/login' />,
                  },
              ];
    return routes;
};
