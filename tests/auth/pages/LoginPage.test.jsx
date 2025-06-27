import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { demoUser, notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailAndPassword({ email, password });
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState,
    },
});

describe('Pruebas en LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de renderizar el componente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        expect(
            screen.getAllByText('Iniciar sesión').length
        ).toBeGreaterThanOrEqual(1);
    });

    test('El boton de Google debe llamar al startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('El submit del formulario debe llamar al startLoginWithEmailAndPassword', () => {
        const email = 'john.doe@gmail.com';
        const password = '123456';
        const formData = {
            email,
            password,
        };

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByRole('textbox', { name: 'Correo' });
        const passwordInput = screen.getByTestId('password');

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith(
            formData
        );
    });
});
