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
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({id, newNoteName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const {info} = await response.json();
    return info;
};

const removeDay = async (dayId, id) => {
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}/userId/${id}`, {
        method: 'DELETE',
    });

    if (response.status !== 200) {
        const {error} = await response.json();
        return Promise.reject(error);
    }

    const {info} = await response.json();

    return info;
};

const removeNote = async ({dayId, noteId, id}) => {
    const response = await fetch(`http://${hostname}:${port}/days/${dayId}/notes/${noteId}/userId/${id}`, {
        method: 'DELETE',
    });

    const {info} = await response.json();

    return info;
};

const addReview = async (review) => {
    const response = await fetch(`http://${hostname}:${port}/review`, {
        method: 'POST',
        body: JSON.stringify({review}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
};

const getReviews = async () => {
    const response = await fetch(`http://${hostname}:${port}/review`);
    return await response.json();
};

const loginUser = async ({login, password}) => {
    const response = await fetch(`http://${hostname}:${port}/login`, {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
};

const registerUser = async ({login, password}) => {
    const response = await fetch(`http://${hostname}:${port}/register`, {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json()
};

export {
    getDays,
    getDoctors,
    getReviews,
    addDay,
    addDoctor,
    addReview,
    editNote,
    removeDay,
    removeNote,
    deleteDoctor,
    editDoctor,
    loginUser,
    registerUser
};
