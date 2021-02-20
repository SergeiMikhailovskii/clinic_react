const fs = require('fs');
const path = require('path');

const fsp = fs.promises;

const dirPath = path.resolve(__dirname, './temp');
const schedulesPath = path.resolve(__dirname, './temp/schedules');
const hospitalFilePath = path.resolve(schedulesPath, 'schedule.json');
const doctorsFilePath = path.resolve(dirPath, 'doctors.json');

const readHospitalData = async () => {
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

const writeHospitalData = async (data) => {
    if (data === undefined) return;

    await fsp.writeFile(hospitalFilePath, JSON.stringify(data), 'utf-8');
};

const writeDoctorsData = async (data) => {
    if (data === undefined) return;

    await fsp.writeFile(doctorsFilePath, JSON.stringify(data), 'utf-8');
};

module.exports = {
    readHospitalData,
    readDoctorsData,
    writeHospitalData,
    writeDoctorsData
};