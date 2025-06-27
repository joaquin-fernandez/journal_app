export const demoNotes = [
    {
        id: '123456789',
        title: 'Primer nota',
        body: 'Esta es la primer nota',
        date: 1676876800000,
        images: [],
    },
    {
        id: '987654321',
        title: 'Segunda nota',
        body: 'Esta es la segunda nota',
        date: 1676876800000,
        images: [],
    },
];

export const demoNote = {
    id: '123456789',
    title: 'Primer nota',
    body: 'Esta es la primer nota',
    date: 1676876800000,
    images: [],
};

export const initialState = {
    notes: [],
    activeNote: null,
    isSaving: false,
    messageSaved: '',
};

export const demoNotesState = {
    notes: demoNotes,
    activeNote: null,
    isSaving: false,
    messageSaved: '',
};

export const demoNotesStateWithActiveNote = {
    notes: demoNotes,
    activeNote: demoNotes[0],
    isSaving: false,
    messageSaved: '',
};

export const demoNoteStateWithMessage = {
    notes: demoNotes,
    activeNote: demoNotes[0],
    isSaving: false,
    messageSaved: 'Nota actualizada correctamente',
};
