const DeleteTraining = require('./DeleteTraining');
const { ROLES } = require('../../common/constants');
const { NotFoundError, UnauthorizedError } = require('../../common/errors');

describe('deleteTraining', () => {
    let models;
    let user;
    let deleteTraining;
    let AuditLogService;

    beforeEach(() => {
        models = {
            Trainings: {
                findByPk: jest.fn(),
            },
            UserTrainings: {
                destroy: jest.fn(),
            },
        };
        AuditLogService = {
            log: jest.fn(),
        };

        user = {
            id: 1,
            role: ROLES.USER, // Default to a non-admin user
        };

        deleteTraining = DeleteTraining({
            models,
            services: { AuditLogService },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw NotFoundError if the training does not exist', async () => {
        models.Trainings.findByPk.mockResolvedValue(null);

        await expect(deleteTraining({ user, params: { id: 1 } })).rejects.toThrowError(
            new NotFoundError('Training not found')
        );
    });

    it('should throw UnauthorizedError if the user does not have permission to delete the training', async () => {
        const training = { id: 1, created_by: 2 }; // Not created by the current user
        models.Trainings.findByPk.mockResolvedValue(training);

        await expect(deleteTraining({ user, params: { id: 1 } })).rejects.toThrowError(
            new UnauthorizedError('You do not have permission to delete this training')
        );
    });

    it("should delete the training and remove it from the user's list if authorized", async () => {
        const training = { id: 1, created_by: 1, name: 'Test Training', destroy: jest.fn() };
        models.Trainings.findByPk.mockResolvedValue(training);

        user.role = ROLES.ADMIN; // Admin user can delete

        const result = await deleteTraining({ user, params: { id: 1 } });

        expect(result).toEqual({ status: 'success' });
        expect(training.destroy).toHaveBeenCalled();
        expect(models.UserTrainings.destroy).toHaveBeenCalledWith({
            where: {
                training_id: 1,
            },
        });
        expect(AuditLogService.log).toHaveBeenCalledWith(models, user.id, 'delete_training', {
            id: 1,
            name: 'Test Training',
        });
    });

    it("should delete the training and remove it from the user's list if the user is the creator", async () => {
        const training = { id: 1, created_by: 1, name: 'Test Training', destroy: jest.fn() };
        models.Trainings.findByPk.mockResolvedValue(training);

        const result = await deleteTraining({ user, params: { id: 1 } });

        expect(result).toEqual({ status: 'success' });
        expect(training.destroy).toHaveBeenCalled();
        expect(models.UserTrainings.destroy).toHaveBeenCalledWith({
            where: {
                training_id: 1,
            },
        });
        expect(AuditLogService.log).toHaveBeenCalledWith(models, user.id, 'delete_training', {
            id: 1,
            name: 'Test Training',
        });
    });
});
