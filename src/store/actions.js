const DOWNLOAD_DAYS = 'DOWNLOAD_DAYS';
const DOWNLOAD_DOCTORS = 'DOWNLOAD_DOCTORS';
const DOWNLOAD_REVIEWS = 'DOWNLOAD_REVIEWS';
const ADD_NEW_DOCTOR = 'ADD_NEW_DOCTOR';
const ADD_DAY = 'ADD_DAY';
const REMOVE_DAY = 'REMOVE_DAY';
const EDIT_NOTE = 'EDIT_NOTE';
const REMOVE_NOTE = 'REMOVE_NOTE';

const downloadDaysAction = (days) => ({
    type: DOWNLOAD_DAYS,
    payload: days
});

const downloadDoctorsAction = (doctors) => ({
    type: DOWNLOAD_DOCTORS,
    payload: doctors
});

const downloadReviewsAction = (reviews) => ({
    type: DOWNLOAD_REVIEWS,
    payload: reviews
});

const addNewDoctorAction = (doctors) => ({
    type: ADD_NEW_DOCTOR,
    payload: doctors
});

const addDayAction = ({dayDate, dayChange, notes}) => ({
    type: ADD_DAY,
    payload: {
        dayDate,
        dayChange,
        notes
    }
});

const removeNotelistAction = dayId => ({
    type: REMOVE_DAY,
    payload: dayId
});

const editNoteAction = ({dayId, noteId, newNoteName}) => ({
    type: EDIT_NOTE,
    payload: {
        dayId,
        noteId,
        newNoteName
    }
});

const removeNoteAction = ({dayId, noteId}) => ({
    type: REMOVE_NOTE,
    payload: {
        dayId,
        noteId
    }
});

export {
    DOWNLOAD_DAYS,
    DOWNLOAD_DOCTORS,
    DOWNLOAD_REVIEWS,
    ADD_DAY,
    ADD_NEW_DOCTOR,
    REMOVE_DAY,
    EDIT_NOTE,
    REMOVE_NOTE,
    downloadDaysAction,
    downloadDoctorsAction,
    downloadReviewsAction,
    addNewDoctorAction,
    addDayAction,
    removeNotelistAction,
    editNoteAction,
    removeNoteAction
};
