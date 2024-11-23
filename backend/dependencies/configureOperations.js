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
const GetMyTrainings = require('../api/mytrainings/GetMyTrainings');
const GetMe = require('../api/users/GetMe');
const EditMe = require('../api/users/EditMe');
const Registration = require('../api/auth/Registration');

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
    const getMyTrainings = GetMyTrainings({ models, services });
    const getMe = GetMe({ models, services });
    const editMe = EditMe({ models, services });
    const registration = Registration({ models, services });

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
        getMyTrainings,
        getMe,
        editMe,
        registration,
    };
}

module.exports = configureOperations;
