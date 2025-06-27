import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null,
};

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) =>
                note.id === action.payload.id ? action.payload : note
            );
            state.messageSaved = `Nota actualizada correctamente`;
        },
        setImagesToActiveNote: (state, action) => {
            state.activeNote.images = [
                ...state.activeNote.images,
                ...action.payload,
            ];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.notes = [];
            state.activeNote = null;
            state.messageSaved = '';
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload
            );
            state.activeNote = null;
        },
    },
});

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setImagesToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;
