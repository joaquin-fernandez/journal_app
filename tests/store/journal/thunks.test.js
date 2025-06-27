import {
    startDeletingNote,
    startLoadingNotes,
    startNewNote,
    startSaveNote,
    startUploadingFiles,
} from '../../../src/store/journal/thunks';
import {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setImagesToActiveNote,
    setNotes,
    setSaving,
    updateNote,
} from '../../../src/store/journal/journalSlice';
import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import { fileUpload } from '../../../src/helpers';

jest.mock('../../../src/helpers/fileUpload');

describe('Pruebas en JournalThunks', () => {
    const uid = 'TEST-UID';
    const note = {
        title: '',
        body: '',
        id: expect.any(String),
        date: expect.any(Number),
        images: [],
    };

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const deleteNotes = async () => {
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach((doc) => {
            deletePromises.push(deleteDoc(doc.ref));
        });
        await Promise.all(deletePromises);
    };

    const getNoteId = async () => {
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        let id = '';
        docs.forEach((doc) => {
            id = doc.id;
        });
        return id;
    };

    afterEach(async () => {
        await deleteNotes();
    });

    test('startNewNote debe de crear una nueva nota en blanco', async () => {
        getState.mockReturnValue({
            //El mockReturnValue regresa inmediatamente el valor que se le pasa el mockResolvedValue es para las promesas
            auth: {
                uid,
            },
        });

        await startNewNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(note));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(note));
    });

    test('startLoadingNotes debe de cargar las notas del usuario', async () => {
        getState.mockReturnValue({
            auth: {
                uid,
            },
        });
        await startNewNote()(dispatch, getState);

        const notes = [note];

        await startLoadingNotes()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setNotes(notes));
    });

    test('startSaveNote debe de guardar la nota activa', async () => {
        getState.mockReturnValue({
            auth: {
                uid,
            },
            journal: {
                activeNote: note,
            },
        });
        await startNewNote()(dispatch, getState);

        note.id = await getNoteId();
        note.date = new Date().getTime();

        await startSaveNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith(updateNote(note));
    });

    test('startUploadingFiles debe de subir las imágenes de la nota activa', async () => {
        getState.mockReturnValue({
            auth: {
                uid,
            },
            journal: {
                activeNote: note,
            },
        });
        await fileUpload.mockResolvedValue('https://example.com/image.png');

        await startNewNote()(dispatch, getState);

        await startUploadingFiles(['image.png'])(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith(
            setImagesToActiveNote(['https://example.com/image.png'])
        );
    });

    test('startDeletingNote debe de eliminar la nota activa', async () => {
        getState.mockReturnValue({
            auth: {
                uid,
            },
            journal: {
                activeNote: note,
            },
        });
        await startNewNote()(dispatch, getState);

        note.id = await getNoteId();

        await startDeletingNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(deleteNoteById(note.id));
    });
});
