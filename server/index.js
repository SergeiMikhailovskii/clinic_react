const express = require('express');
const app = express();
const {readHospitalData, readDoctorsData, writeHospitalData, writeDoctorsData, readReviews, writeReviews} = require('./utils');
const port = 4321;
const hostname = 'localhost';

let days = [];
let doctors = [];
let reviews = [];

// Middleware разрешения CORS-запросов
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware для логирования запросов 
app.use((request, response, next) => {
    console.log(
        (new Date()).toISOString(),
        request.method,
        request.originalUrl
    );
    next();
});

// Middleware для правильного представления request.body
app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.post('/days/get', async (request, response) => {
    days = await readHospitalData(request.body.id);
    response.setHeader('Content-Type', 'application/json');
    await response.json(days);
});

app.get('/doctors', async (request, response) => {
    doctors = await readDoctorsData();
    response.setHeader('Content-Type', 'application/json');
    await response.json(doctors)
});

app.get('/review', async (request, response) => {
    reviews = await readReviews();
    response.setHeader('Content-Type', 'application/json');
    await response.json(reviews)
});

app.post('/days', async (request, response) => {
    days.push(request.body.day);
    await writeHospitalData(days, request.body.id);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Day '${request.body.day.dayDate}' was successfully added`
    });
});

app.post('/doctor', async (request, response) => {
    doctors = await readDoctorsData();
    const doctor = request.body;
    doctor.id = doctors[doctors.length - 1].id + 1;
    doctors.push(doctor);
    await writeDoctorsData(doctors);
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(doctors)
});

app.patch('/days/:dayId/notes/:noteId', async (request, response) => {
    const {newNoteName, id} = request.body;
    const dayId = Number(request.params.dayId);
    const noteId = Number(request.params.noteId);

    let oldNoteName = days[dayId].notes[noteId].noteName;
    days[dayId].notes[noteId].noteName = newNoteName;
    await writeHospitalData(days, id);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Patient '${oldNoteName}' was successfully changed in day
        '${days[dayId].dayDate}' to '${newNoteName}'`
    });
});

app.delete('/days/:dayId/userId/:userId', async (request, response) => {
    const dayId = Number(request.params.dayId);
    const id = Number(request.params.userId);

    for (let i = 0; i < days[dayId].length; i++) {
        if (days[dayId].notes[i].noteName) {
            response.setHeader('Content-Type', 'application/json');
            response.status(403).json({
                error: `Can't delete non-empty day '${days[dayId].dayDate}'`
            });
        }
    }

    const removedDay = days[dayId];
    days = days.filter(
        (day, index) => index !== dayId
    );
    await writeHospitalData(days, id);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Day '${removedDay.dayDate}' was successfully deleted`
    });
});

app.post("/doctor/delete", async (request, response) => {
    doctors = await readDoctorsData();
    doctors = doctors.filter(el => el.id !== request.body.id);
    await writeDoctorsData(doctors);
    response.status(200).json(doctors)
});

app.post("/doctor/edit", async (request, response) => {
    doctors = await readDoctorsData();
    doctors = doctors.map(el => {
        if (el.id === request.body.id) {
            el.doctorName = request.body.doctorName;
            el.doctorSpecialization = request.body.doctorSpecialization;
            el.doctorPhoto = request.body.doctorPhoto;
        }
        return el;
    });
    await writeDoctorsData(doctors);
    response.status(200).json(doctors)
});

app.post("/review", async (request, response) => {
    reviews = await readReviews();
    const review = request.body;
    if (reviews.length === 0) {
        review.id = 1
    } else {
        review.id = reviews[reviews.length - 1].id + 1;
    }
    reviews.push(review);
    await writeReviews(reviews);
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(reviews)
});

app.delete('/days/:dayId/notes/:noteId/userId/:userId', async (request, response) => {
    const dayId = Number(request.params.dayId);
    const noteId = Number(request.params.noteId);
    const id = Number(request.params.userId);

    const removedNoteName = days[dayId].notes[noteId].noteName;
    days[dayId].notes = days[dayId].notes.map(
        (note, index) => {
            if (index === noteId) {
                note.noteName = '';
            }
            return note;
        }
    );

    await writeHospitalData(days, id);
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Patient '${removedNoteName}' was successfully deleted from day
        '${days[dayId].dayDate}'`
    });
});

app.listen(port, hostname, (err) => {
    if (err) {
        console.error('Error: ', err);
    }
    console.log(`Server is working on ${hostname}:${port}`);
});