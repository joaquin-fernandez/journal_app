const errorMessages = {
    'auth/email-already-in-use': 'El correo ingresado ya está en uso',
    'auth/invalid-email': 'Correo inválido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/weak-password': 'Contraseña demasiado débil',
    'auth/user-disabled': 'Usuario deshabilitado',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Usuario y/o contraseña incorrectos',
};

export const getErrorMessage = (error) => {
    return errorMessages[error.code] || error.message;
};
