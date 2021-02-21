const port = 4321;
const hostname = 'localhost';

const getDays = async () => {
    const response = await fetch(`http://${hostname}:${port}/days`);
    const days = await response.json();

    return days;
};

const getDoctors = async () => {
    const response = await fetch(`http://${hostname}:${port}/doctors`);
    return await response.json();
};

const addDay = async (day) => {
    const response = await fetch(`http://${hostname}:${port}/days`, {
        method: 'POST',
        body: JSON.stringify(day),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const addDoctor = async (doctor) => {
    const response = await fetch(`http://${hostname}:${port}/doctor`, {
        method: 'POST',
        body: JSON.stringify(doctor),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const info = await response.json();
    return info;
};

const editNote = async ({dayId, noteId, newNoteName}) => {
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({newNoteName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const {info} = await response.json();
    return info;
}

const removeDay = async (dayId) => {
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}`, {
        method: 'DELETE',
    });

    if (response.status !== 200) {
        const {error} = await response.json();
        return Promise.reject(error);
    }

    const {info} = await response.json();

    return info;
}

const removeNote = async ({dayId, noteId}) => {
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}/notes/${noteId}`, {
        method: 'DELETE',
    });

    const {info} = await response.json();

    return info;
}

export {
    getDays,
    getDoctors,
    addDay,
    addDoctor,
    editNote,
    removeDay,
    removeNote
};
