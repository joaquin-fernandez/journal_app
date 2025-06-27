import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';
import { Fab, Tooltip, Typography } from '@mui/material';
import { NoteView, NothingSelectedView } from '../view';
import { Add } from '@mui/icons-material';

export const JournalPage = () => {
    const { isSaving, activeNote } = useSelector((state) => state.journal);
    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote());
    };

    return (
        <>
            {!activeNote ? <NothingSelectedView /> : <NoteView />}
            <Tooltip title='Nueva nota' placement='left' arrow>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{ position: 'fixed', bottom: 50, right: 50 }}
                    onClick={onClickNewNote}
                    disabled={isSaving}
                >
                    <Add color='secondary' />
                </Fab>
            </Tooltip>
        </>
    );
};
