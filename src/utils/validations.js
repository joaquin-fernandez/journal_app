export const formValidationsTypes = {
    email: 'email',
    password: 'password',
    displayName: 'displayName',
};

const formValidations = {
    email: [
        (value) => {
            const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            return regex.test(value);
        },
        'El correo debe tener el formato mail@dominio.com',
    ],
    password: [
        (value) => value.length >= 6,
        'La contraseña debe tener al menos 6 caracteres',
    ],
    displayName: [
        (value) => value.length >= 2,
        'El nombre debe tener al menos 2 caracteres',
    ],
};

export const getFormValidations = (validationTypes = []) => {
    const validations = {};

    for (const validationType of validationTypes) {
        validations[validationType] = formValidations[validationType];
    }

    return validations;
};
