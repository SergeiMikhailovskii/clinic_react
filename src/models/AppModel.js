const port = 4321;
const hostname = 'localhost';

const getDays = async (id) => {
    const response = await fetch(`http://${hostname}:${port}/days/get`, {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

const getDoctors = async () => {
    const response = await fetch(`http://${hostname}:${port}/doctors`);
    return await response.json();
};

const addDay = async (id, day) => {
    const response = await fetch(`http://${hostname}:${port}/days`, {
        method: 'POST',
        body: JSON.stringify({id, day}),
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

    return await response.json();
};

const editDoctor = async (doctor) => {
    const response = await fetch(`http://${hostname}:${port}/doctor/edit`, {
        method: 'POST',
        body: JSON.stringify(doctor),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
};

const deleteDoctor = async (id) => {
    const response = await fetch(`http://${hostname}:${port}/doctor/delete`, {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
};

const editNote = async ({dayId, noteId, newNoteName, id}) => {
    console.log("AppModel " + id)
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({id, newNoteName}),
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
    removeNote,
    deleteDoctor,
    editDoctor
};
