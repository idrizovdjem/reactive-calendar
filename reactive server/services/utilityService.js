const crypto = require('crypto');

function addErrorMessage(response, message) {
    response.successfull = false;
    response.errorMessages.push(message);
}

function hashPassword(password) {
    const hash = crypto.createHash('sha512').update(password, 'utf-8');
    const result = hash.digest('hex');
    return result;
}

module.exports = {
    addErrorMessage,
    hashPassword
};