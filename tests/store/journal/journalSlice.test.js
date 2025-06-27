import {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    journalSlice,
    savingNewNote,
    setActiveNote,
    setImagesToActiveNote,
    setNotes,
    setSaving,
    updateNote,
} from '../../../src/store/journal';
import {
    demoNote,
    demoNotes,
    demoNotesState,
    demoNotesStateWithActiveNote,
    demoNoteStateWithMessage,
    initialState,
} from '../../fixtures/journalFixtures';

describe('Pruebas en JournalSlice', () => {
    test('Debe de regresar el estado inicial y llamarse "journal"', () => {
        const state = journalSlice.reducer(initialState, {});
        expect(journalSlice.name).toBe('journal');
        expect(state).toEqual(initialState);
    });

    test('Debe de cambiar el estado a "isSaving = true" (savingNewNote)', () => {
        const state = journalSlice.reducer(initialState, savingNewNote());
        expect(state).toEqual({
            ...initialState,
            isSaving: true,
        });
    });

    test('Debe de agregar una nota nueva', () => {
        const newNote = demoNote;
        const state = journalSlice.reducer(
            initialState,
            addNewEmptyNote(newNote)
        );
        expect(state).toEqual({
            ...initialState,
            notes: [...initialState.notes, newNote],
        });
    });

    test('Debe de establecer la nota activa', () => {
        const activeNote = demoNote;
        const state = journalSlice.reducer(
            initialState,
            setActiveNote(activeNote)
        );
        expect(state).toEqual({
            ...initialState,
            activeNote,
        });
    });

    test('Debe de establecer las notas', () => {
        const notes = demoNotes;
        const state = journalSlice.reducer(initialState, setNotes(notes));
        expect(state).toEqual(demoNotesState);
    });

    test('Debe de cambiar el estado a "isSaving = true" (setSaving)', () => {
        const state = journalSlice.reducer(initialState, setSaving());
        expect(state).toEqual({
            ...initialState,
            isSaving: true,
        });
    });

    test('Debe de actualizar la nota activa', () => {
        const activeNote = demoNote;
        const state = journalSlice.reducer(
            demoNotesStateWithActiveNote,
            updateNote(activeNote)
        );
        expect(state).toEqual(demoNoteStateWithMessage);
    });

    test('Debe de establecer las imágenes de la nota activa', () => {
        const images = [
            'https://example.com/image1.png',
            'https://example.com/image2.png',
        ];
        const activeNote = demoNote;
        const state = journalSlice.reducer(
            demoNotesStateWithActiveNote,
            setImagesToActiveNote(images)
        );
        expect(state).toEqual({
            ...demoNotesStateWithActiveNote,
            activeNote: { ...activeNote, images },
        });
    });

    test('Debe de limpiar el journal al hacer logout', () => {
        const state = journalSlice.reducer(
            demoNoteStateWithMessage,
            clearNotesLogout()
        );
        expect(state).toEqual(initialState);
    });

    test('Debe de eliminar una nota', () => {
        const notes = demoNotes;
        const activeNote = demoNotes[0];
        const state = journalSlice.reducer(
            demoNotesStateWithActiveNote,
            deleteNoteById(activeNote.id)
        );
        expect(state).toEqual({
            ...demoNotesStateWithActiveNote,
            notes: [notes[1]],
            activeNote: null,
        });
    });
});
