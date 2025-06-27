import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {
    Button,
    Divider,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import Google from '@mui/icons-material/Google';
import { useForm } from '../../hooks';
import {
    startGoogleSignIn,
    startLoginWithEmailAndPassword,
} from '../../store/auth';
import { formValidationsTypes, getFormValidations } from '../../utils';
import { AlertNotification } from '../../ui';

const initialForm = {
    email: '',
    password: '',
};

const formValidations = getFormValidations([
    formValidationsTypes.email,
    formValidationsTypes.password,
]);

export const LoginPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { status, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        email,
        password,
        onInputChange,
        formState,
        emailValid,
        passwordValid,
        isFormValid,
    } = useForm(initialForm, formValidations);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        dispatch(startLoginWithEmailAndPassword(formState));
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <Grid>
            <Typography
                variant='h5'
                sx={{ mb: 3 }}
                align='center'
                fontWeight={700}
            >
                Iniciar sesión
            </Typography>

            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn'
                aria-label='submit-form'
            >
                <Grid container>
                    <AlertNotification errorMessage={errorMessage} />
                    <Grid size={12}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@mail.com'
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={
                                !!emailValid && formSubmitted && emailValid
                            }
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            slotProps={{
                                input: {
                                    inputProps: {
                                        'data-testid': 'password',
                                    },
                                },
                            }}
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={
                                !!passwordValid &&
                                formSubmitted &&
                                passwordValid
                            }
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={12} container sx={{ mb: 2, mt: 1 }}>
                        <Grid size={12}>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={isAuthenticating}
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Divider sx={{ m: 1 }}>o</Divider>
                        </Grid>
                        <Grid size={12}>
                            <Button
                                variant='contained'
                                onClick={onGoogleSignIn}
                                disabled={isAuthenticating}
                                aria-label='google-btn'
                                fullWidth
                            >
                                <Typography variant='button' sx={{ mr: 1 }}>
                                    Ingresar con
                                </Typography>
                                <Google />
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
                            <Typography>¿No tienes cuenta?</Typography>
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
                                    to='/auth/register'
                                >
                                    Regístrate
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};
