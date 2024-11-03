/**
 * Create audit log
 * @param userId
 * @param logType
 * @param logData
 * @returns {status}
 */
async function log(models, userId, logType, logData) {
    await models.AuditLogs.create({
        user_id: userId,
        log_type: logType,
        log_data: logData,
    });

    return {
        status: 'success',
    };
}

module.exports.log = log;
