import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';
import { AlertNotification } from '../../ui/';
import { formValidationsTypes, getFormValidations } from '../../utils';

const formValidations = getFormValidations([
    formValidationsTypes.email,
    formValidationsTypes.password,
    formValidationsTypes.displayName,
]);

const initialForm = {
    displayName: '',
    email: '',
    password: '',
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
    const isCheckingAuthentication = useMemo(
        () => status === 'checking',
        [status]
    );

    const {
        displayName,
        email,
        password,
        onInputChange,
        isFormValid,
        displayNameValid,
        emailValid,
        passwordValid,
        formState,
    } = useForm(initialForm, formValidations);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailAndPassword(formState));
    };

    return (
        <Grid>
            <Typography
                variant='h5'
                sx={{ mb: 3 }}
                align='center'
                fontWeight={700}
            >
                Crea tu cuenta
            </Typography>
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn'
            >
                <Grid container>
                    <AlertNotification errorMessage={errorMessage} />
                    <Grid size={12}>
                        <TextField
                            label='Nombre completo'
                            type='text'
                            placeholder='Nombre completo'
                            fullWidth
                            value={displayName}
                            name='displayName'
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@mail.com'
                            fullWidth
                            value={email}
                            name='email'
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            value={password}
                            name='password'
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid size={12} container sx={{ mb: 2, mt: 1 }}>
                        <Grid size={12}>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={isCheckingAuthentication}
                                fullWidth
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        size={12}
                        container
                        direction='row'
                        justifyContent='center'
                        sx={{ mt: 2 }}
                    >
                        <Grid>
                            <Typography>¿Ya tienes cuenta?</Typography>
                        </Grid>
                        <Grid>
                            <Typography>
                                <Link
                                    component={RouterLink}
                                    variant='button'
                                    color='primary'
                                    sx={{
                                        ml: 1,
                                        p: 0,
                                        textDecoration: 'none',
                                    }}
                                    to='/auth/login'
                                >
                                    Ingresa
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};
