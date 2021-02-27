const fs = require('fs');
const path = require('path');

const fsp = fs.promises;

const dirPath = path.resolve(__dirname, './temp');
const schedulesPath = path.resolve(__dirname, './temp/schedules');
const doctorsFilePath = path.resolve(dirPath, 'doctors.json');
const reviewsFilePath = path.resolve(dirPath, 'reviews.json');
let hospitalFilePath = path.resolve(schedulesPath, 'schedule1.json');

const readHospitalData = async (id) => {
    hospitalFilePath = path.resolve(schedulesPath, 'schedule' + id + '.json');
    if (!fs.existsSync(hospitalFilePath)) {
        if (!fs.existsSync(dirPath)) {
            await fsp.mkdir(dirPath);
        }

        const file = await fsp.open(hospitalFilePath, 'w');
        await file.write('[]');
        await file.close();
        return [];
    }

    const data = await fsp.readFile(hospitalFilePath, {encoding: 'utf-8'});
    return JSON.parse(data);
};

const readDoctorsData = async () => {
    if (!fs.existsSync(doctorsFilePath)) {
        if (!fs.existsSync(dirPath)) {
            await fsp.mkdir(dirPath);
        }

        const file = await fsp.open(doctorsFilePath, 'w');
        await file.write('[]');
        await file.close();
        return [];
    }

    const data = await fsp.readFile(doctorsFilePath, {encoding: 'utf-8'});
    return JSON.parse(data);
};

const readReviews = async () => {
    if (!fs.existsSync(reviewsFilePath)) {
        if (!fs.existsSync(dirPath)) {
            await fsp.mkdir(dirPath);
        }

        const file = await fsp.open(reviewsFilePath, 'w');
        await file.write('[]');
        await file.close();
        return [];
    }

    const data = await fsp.readFile(reviewsFilePath, {encoding: 'utf-8'});
    return JSON.parse(data);
};

const writeHospitalData = async (data, id) => {
    hospitalFilePath = path.resolve(schedulesPath, 'schedule' + id + '.json');

    if (data === undefined) return;

    await fsp.writeFile(hospitalFilePath, JSON.stringify(data), 'utf-8');
};

const writeDoctorsData = async (data) => {
    if (data === undefined) return;

    await fsp.writeFile(doctorsFilePath, JSON.stringify(data), 'utf-8');
};

const writeReviews = async (data) => {
    if (data === undefined) return;

    await fsp.writeFile(reviewsFilePath, JSON.stringify(data), 'utf-8');
};

module.exports = {
    readHospitalData,
    readDoctorsData,
    readReviews,
    writeHospitalData,
    writeDoctorsData,
    writeReviews
};