export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authenticatedState = {
    status: 'authenticated',
    uid: '123456789',
    email: 'john.doe@gmail.com',
    displayName: 'John Doe',
    photoURL: 'https://example.com/profile.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: '123456789',
    email: 'john.doe@gmail.com',
    displayName: 'John Doe',
    photoURL: 'https://example.com/profile.jpg',
};
