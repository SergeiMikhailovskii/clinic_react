import {
    ADD_DAY,
    ADD_NEW_DOCTOR,
    DOWNLOAD_DAYS,
    DOWNLOAD_DOCTORS,
    DOWNLOAD_REVIEWS,
    EDIT_NOTE,
    REMOVE_DAY,
    REMOVE_NOTE
} from './actions';

const initialState = {
    days: [],
    doctors: [],
    reviews: []
};

export default function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case DOWNLOAD_DAYS:
            return {
                ...state,
                days: payload
            };
        case DOWNLOAD_DOCTORS:
            return {
                ...state,
                doctors: payload
            };
        case DOWNLOAD_REVIEWS:
            return {
                ...state,
                reviews: payload
            };
        case ADD_DAY:
            return {
                ...state,
                days: [
                    ...state.days,
                    {
                        dayDate: payload.dayDate,
                        dayChange: payload.dayChange,
                        notes: payload.notes
                    }
                ]
            };
        case ADD_NEW_DOCTOR:
            return {
                ...state,
                doctors: payload
            };
        case REMOVE_DAY:
            const removedDay = state.days[payload];
            const days = state.days.filter(
                day => day !== removedDay
            );

            return {
                ...state,
                days: days
            };

        case EDIT_NOTE:
            return {
                ...state,
                days: state.days.map(
                    (day, index) => index !== payload.dayId
                        ? {...day}
                        : {
                            ...day,
                            notes: day.notes.map(
                                (note, noteIndex) => {
                                    if (noteIndex === payload.noteId) {
                                        note.noteName = payload.newNoteName;
                                    }
                                    return note;
                                }
                            )
                        }
                )
            };

        case REMOVE_NOTE:
            const notes = state.days[payload.dayId].notes.map(
                (note, index) => {
                    if (index === payload.noteId) {
                        note.noteName = '';
                    }
                    return note;
                }
            );

            return {
                ...state,
                days: state.days.map(
                    (day, index) => index !== payload.dayId
                        ? {
                            ...day
                        }
                        : {
                            ...day,
                            notes
                        }
                )
            };

        default:
            return state;
    }
}