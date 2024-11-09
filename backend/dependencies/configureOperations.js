/**
 * @typedef {function({params: object, data: object, user: object, auth0User: object}): Promise<any>} Operation
 */

const Login = require('../api/auth/Login');
const GenerateQRCode = require('../api/auth/GenerateQRCode');
const SaveQRCode = require('../api/auth/SaveQRCode');
const AddTraining = require('../api/trainings/AddTraining');
const GetTrainings = require('../api/trainings/GetTrainings');
const UpdateTrainingList = require('../api/trainings/UpdateTrainingList');
const GetTraining = require('../api/trainings/GetTraining');
const DeleteTraining = require('../api/trainings/DeleteTraining');
const GetAuditLogs = require('../middleware/logs/GetAuditLogs');

function configureOperations({ models, services }) {
    const login = Login({ models, services });
    const generateQRCode = GenerateQRCode({ models, services });
    const saveQRCode = SaveQRCode({ models, services });
    const addTraining = AddTraining({ models, services });
    const getTrainings = GetTrainings({ models, services });
    const updateTrainingList = UpdateTrainingList({ models, services });
    const getTraining = GetTraining({ models, services });
    const deleteTraining = DeleteTraining({ models, services });
    const getAuditLogs = GetAuditLogs({ models, services });

    return {
        login,
        generateQRCode,
        saveQRCode,
        addTraining,
        getTrainings,
        updateTrainingList,
        getTraining,
        deleteTraining,
        getAuditLogs,
    };
}

module.exports = configureOperations;
