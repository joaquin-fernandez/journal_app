import {
    authSlice,
    checkingCredentials,
    login,
    logout,
} from '../../../src/store/auth/authSlice';
import {
    authenticatedState,
    demoUser,
    initialState,
    notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {
    test('Debe de regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    });

    test('Debe de realizar la autenticación correctamente', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual(authenticatedState);
    });

    test('Debe de realizar el logout correctamente sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual(notAuthenticatedState);
    });

    test('Debe de realizar el logout correctamente con argumentos', () => {
        const errorMessage = 'Error de logout';
        const state = authSlice.reducer(
            authenticatedState,
            logout({ errorMessage })
        );
        expect(state).toEqual({
            ...notAuthenticatedState,
            errorMessage,
        });
    });

    test('Debe de cambiar el estado a "checking"', () => {
        const state = authSlice.reducer(
            authenticatedState,
            checkingCredentials()
        );
        expect(state).toEqual({
            ...authenticatedState,
            status: 'checking',
        });
    });
});
