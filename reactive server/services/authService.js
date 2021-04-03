const { User, Session } = require('../data/context.js');
const crypto = require('crypto');
const { v4 } = require('uuid');

async function register(email, username, password) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    // * simple input data validations
    if (!email || email.length < 5) {
        addErrorMessage(response, 'Invalid email!');
    } else {
        if (await isEmailAvailable(email) === false) {
            addErrorMessage(response, 'This username is already taken!');
        }
    }

    if (!username || username.length < 5) {
        addErrorMessage(response, 'Username must be at least 5 symbols!');
    } else {
        if (await isUsernameAvailabale(username) === false) {
            addErrorMessage(response, 'This username is already taken!');
        }
    }

    if (!password || password.length < 6) {
        addErrorMessage(response, 'Password must be at least 6 symbols long!');
    }

    if (response.successfull) {
        const hash = hashPassword(password);
        const user = await User.create({ email, username, password: hash });

        // create session token for the user
        const uuidToken = v4();
        const session = await Session.create({
            userId: user.id,
            token: uuidToken
        });

        response.data.authToken = session.token;
    }

    return response;
}

async function login(email, password) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    // * simple input data validations
    if (!email || email.length < 5) {
        addErrorMessage(response, 'Invalid email!');
    }

    if (!password || password.length < 6) {
        addErrorMessage(response, 'Password must be at least 6 symbols long!');
    }

    if (response.successfull) {
        const hash = hashPassword(password);
        const userResult = await User.findOne({
            attributes: ['id'],
            where: {
                email: email,
                password: hash
            }
        });

        if (userResult === null) {
            addErrorMessage(response, 'Invalid login information!');
            return response;
        }

        const userId = userResult.dataValues.id;

        const authToken = await Session.findOne({
            attributes: ['token'],
            where: {
                userId: userId
            }
        });

        response.data.authToken = authToken;
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
    register,
    login
};