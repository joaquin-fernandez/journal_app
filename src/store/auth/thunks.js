import {
    loginWithEmailAndPassword,
    logoutFirebase,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok)
            return dispatch(logout({ errorMessage: result.errorMessage }));
        dispatch(login(result));
    };
};

export const startCreatingUserWithEmailAndPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerWithEmailAndPassword({
            email,
            password,
            displayName,
        });
        if (!result.ok)
            return dispatch(logout({ errorMessage: result.errorMessage }));
        dispatch(login(result));
    };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailAndPassword(email, password);
        if (!result.ok)
            return dispatch(logout({ errorMessage: result.errorMessage }));
        dispatch(login(result));
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        //dispatch(checkingCredentials());
        await logoutFirebase();

        dispatch(clearNotesLogout());
    };
};
