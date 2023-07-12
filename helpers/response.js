const SUCCESS_STATUS = 200
const ERROR_STATUS = 500

/**
 * @param   {object | array} result
 */
exports.success = (result) => {
    return {
        result,
        error: false,
        code: SUCCESS_STATUS,
    };
}

/**
 * @param   {string} message
 */
exports.error = (message) => {
    return {
        message,
        code: ERROR_STATUS,
        error: true
    };
}

/**
 * @param   {object | array} errors
 */
exports.validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
}
