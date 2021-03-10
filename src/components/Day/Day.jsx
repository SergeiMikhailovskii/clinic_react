import React, {memo} from 'react';
import {connect} from 'react-redux';
import {removeDay as removeDayServer} from '../../models/AppModel';
import {removeNotelistAction} from '../../store/actions';
import Note from '../Note/Note';
import Cookies from "js-cookie";

const Day = ({
                 dayDate,
                 dayChange,
                 dayId,
                 notes = [],
                 removeNotelistDispatch,
                 id
             }) => {
    const removeNotelist = async (id) => {
        try {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].noteName) {
                    alert("На день назначены приемы. Невозможно удалить.");
                    return;
                }
            }

            // eslint-disable-next-line no-restricted-globals
            if (confirm(`День '${dayDate}' будет удален. Продолжить?`)) {
                const info = await removeDayServer(dayId, id);
                console.log(info);
                removeNotelistDispatch(dayId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="element-container">
            <div className="card">
                {Cookies.get('isAdmin') === 'true' &&
                <span className="card-task-icon card-task-icon-delete card-task-icon-remove-daylist"
                      onClick={() => removeNotelist(id)}
                />}

                <div className="card-header">
                    {dayDate} | {dayChange}
                </div>
                <div className="card-patients-container">
                    {notes.map((note, index) => {
                            if (Cookies.get('isAdmin') === 'true' || (Cookies.get('isAdmin') === 'false' && note.noteName==="")) return <Note
                                noteName={note.noteName}
                                noteTime={note.noteTime}
                                noteId={index}
                                dayId={dayId}
                                id={id}
                                key={`list${dayId}-note${index}`}
                            />
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    removeNotelistDispatch: dayId =>
        dispatch(removeNotelistAction(dayId))
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Day));
