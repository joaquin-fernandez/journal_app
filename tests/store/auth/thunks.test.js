import {
    loginWithEmailAndPassword,
    logoutFirebase,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import {
    checkingAuthentication,
    startGoogleSignIn,
    startLoginWithEmailAndPassword,
    startLogout,
    startCreatingUserWithEmailAndPassword,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de invocar el checkingCredentials', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe de invocar el checkingCredentials y el login - Success', async () => {
        const loginData = {
            ok: true,
            ...demoUser,
        };
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe de invocar el checkingCredentials y el logout - Error', async () => {
        const loginData = {
            ok: false,
            errorMessage: 'Error de login',
        };
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(
            logout({ errorMessage: loginData.errorMessage })
        );
    });

    test('startLoginWithEmailAndPassword debe de invocar el checkingCredentials y el login - Success', async () => {
        const loginData = {
            ok: true,
            ...demoUser,
        };
        const formData = {
            email: demoUser.email,
            password: '123456',
        };
        await loginWithEmailAndPassword.mockResolvedValue(loginData);
        await startLoginWithEmailAndPassword(formData)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLoginWithEmailAndPassword debe de invocar el checkingCredentials y el logout - Error', async () => {
        const loginData = {
            ok: false,
            errorMessage: 'Error de login',
        };
        const formData = {
            email: demoUser.email,
            password: '123456',
        };
        await loginWithEmailAndPassword.mockResolvedValue(loginData);
        await startLoginWithEmailAndPassword(formData)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(
            logout({ errorMessage: loginData.errorMessage })
        );
    });

    test('startCreatingUserWithEmailAndPassword debe de invocar el checkingCredentials y el login - Success', async () => {
        const loginData = {
            ok: true,
            ...demoUser,
        };
        const formData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName,
        };
        await registerWithEmailAndPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailAndPassword(formData)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startCreatingUserWithEmailAndPassword debe de invocar el checkingCredentials y el logout - Error', async () => {
        const loginData = {
            ok: false,
            errorMessage: 'Error de registro',
        };
        const formData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName,
        };
        await registerWithEmailAndPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailAndPassword(formData)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(
            logout({ errorMessage: loginData.errorMessage })
        );
    });

    test('startLogout debe de invocar el checkingCredentials, logoutFirebase y clearNotesLogout', async () => {
        await startLogout()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    });
});
