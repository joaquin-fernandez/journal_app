import { AuthLayout } from '../auth/layout/AuthLayout';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalLayout } from '../journal/layout/JournalLayout';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { Navigate } from 'react-router-dom';
import { JournalApp } from '../JournalApp';

export const getRoutes = (status) => {
    return [
        {
            path: '/',
            element: <JournalApp />,
            children:
                status === 'authenticated'
                    ? [
                          {
                              path: '/',
                              element: <JournalLayout />,
                              children: JournalRoutes,
                          },
                          {
                              path: '*',
                              element: <Navigate to='/' replace />,
                          },
                      ]
                    : [
                          {
                              path: '/auth/*',
                              element: <AuthLayout />,
                              children: AuthRoutes,
                          },
                          {
                              path: '*',
                              element: <Navigate to='/auth/login' replace />,
                          },
                          {
                              index: true,
                              path: '/',
                              element: <Navigate to='/auth' replace />,
                          },
                      ],
        },
    ];
};
