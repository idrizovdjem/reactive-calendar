const { User } = require('../data/context.js');
const crypto = require('crypto');

async function register(email, username, password) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    // * simple input data validations
    if(!email || email.length < 5) {
        addErrorMessage(response, 'Invalid email!');
    }

    if(!username || username.length < 5) {
        addErrorMessage(response, 'Username must be at least 5 symbols!');
    }

    if(!password || password.length < 6) {
        addErrorMessage(response, 'Password must be at least 6 symbols long!');
    }

    // * add more complex validations
    if(await isEmailAvailable(email) === false) {
        addErrorMessage(response, 'This username is already taken!');
    }

    if(await isUsernameAvailabale(username) === false) {
        addErrorMessage(response, 'This username is already taken!');
    }

    if(response.successfull) {
        const hash = hashPassword(password);
        const user = await User.create({ email, username, password: hash });
        response.data = user;
    }

    return response;
}

function addErrorMessage(response, message) {
    response.successfull = false;
    response.errorMessages.push(message);
}

async function isEmailAvailable(email) {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    return user === null;
}

async function isUsernameAvailabale(username) {
    const user = await User.findOne({
        where: {
            username: username
        }
    });

    return user === null;
}

function hashPassword(password) {
    const hash = crypto.createHash('sha512').update(password, 'utf-8');
    const result = hash.digest('hex');
    return result;
}

module.exports = {
    register
};