import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';
import { getErrorMessage } from './errorHandler';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: getErrorMessage(error),
        };
    }
};

export const registerWithEmailAndPassword = async ({
    email,
    password,
    displayName,
}) => {
    try {
        const result = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );
        const { photoURL, uid } = result.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        return {
            ok: false,
            error,
            errorMessage: getErrorMessage(error),
        };
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );
        const { displayName, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        return {
            ok: false,
            error,
            errorMessage: getErrorMessage(error),
        };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};
