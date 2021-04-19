const crypto = require('crypto');

function addErrorMessage(response, message) {
    // append input message to resposne object
    // and set ok flag to false
    response.ok = false;
    response.errorMessages.push(message);
}

function createResponse() {
    // create initial response object
    return {
        ok: true,
        errorMessages: [],
        data: {}
    };
}

function hashPassword(password) {
    // receive password as an input, hash it with sha512 algorithm
    // and return it
    const hash = crypto.createHash('sha512').update(password, 'utf-8');
    const result = hash.digest('hex');
    return result;
}

module.exports = {
    addErrorMessage,
    createResponse,
    hashPassword
};