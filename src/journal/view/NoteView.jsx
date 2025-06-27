import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect, useRef } from 'react';

import { DeleteOutlined, SaveOutlined, Upload } from '@mui/icons-material';
import {
    Alert,
    Button,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    Zoom,
} from '@mui/material';

import { ImageGallery } from '../components';
import { useAlert, useForm } from '../../hooks';
import {
    setActiveNote,
    startDeletingNote,
    startSaveNote,
    startUploadingFiles,
} from '../../store/journal';
import { formatDateMonth } from '../../utils';
import { AlertNotification } from '../../ui';

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote, messageSaved, isSaving } = useSelector(
        (state) => state.journal
    );
    const {
        title,
        body,
        date,
        onInputChange,
        formState,
        images,
        isFormValuesChanged,
        updateInitialFormState,
    } = useForm(activeNote);
    const { showConfirmAlert, showAlert } = useAlert();

    const dateString = useMemo(() => {
        return formatDateMonth(date);
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved) {
            showAlert({
                title: '¡Guardado!',
                text: messageSaved,
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
            });
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
        updateInitialFormState();
    };

    const onFileInputChange = ({ target }) => {
        const files = target.files;
        if (!files.length) return;
        dispatch(startUploadingFiles(files));
    };

    const onDeleteNote = () => {
        showConfirmAlert({
            text: '¿Estás seguro?',
            title: 'Eliminar nota',
            confirm: 'Eliminar',
            callback: () => {
                dispatch(startDeletingNote());
            },
        });
    };

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn'
        >
            <Grid>
                <Typography fontSize={{ xs: 30, md: 39 }} fontWeight='light'>
                    {dateString}
                </Typography>
            </Grid>
            <Grid>
                <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />
                <Tooltip
                    placement='left'
                    title='Subir fotos'
                    slots={{
                        transition: Zoom,
                    }}
                    arrow
                >
                    <IconButton
                        color='primary'
                        disabled={isSaving}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <Upload sx={{ fontSize: 30 }} />
                    </IconButton>
                </Tooltip>
                <Button
                    sx={{ p: 1, alignItems: 'flex-end' }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container size={12}>
                {isFormValuesChanged && (
                    <AlertNotification
                        severity='info'
                        errorMessage='La nota ha cambiado, guarda antes de salir o se perderán los cambios'
                        sx={{ mb: 1, mt: 1 }}
                    />
                )}
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un título'
                    label='Título'
                    value={title}
                    name='title'
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1, mt: 2 }}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió el día de hoy?'
                    value={body}
                    name='body'
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1, mt: 1 }}
                    minRows={6}
                />
            </Grid>

            <Grid container size={12} justifyContent='end'>
                <Button
                    variant='contained'
                    color='error'
                    onClick={onDeleteNote}
                    sx={{ mt: 2, p: 1, alignItems: 'flex-end' }}
                >
                    <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Eliminar
                </Button>
            </Grid>

            <ImageGallery images={images} />
        </Grid>
    );
};
