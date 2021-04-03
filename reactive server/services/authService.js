const { User, Session } = require('../data/context.js');
const { v4 } = require('uuid');
const utilityService = require('./utilityService.js');

async function register(email, username, password) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    // * simple input data validations
    if (!email || email.length < 5) {
        utilityService.addErrorMessage(response, 'Invalid email!');
    } else {
        if (await isEmailAvailable(email) === false) {
            utilityService.addErrorMessage(response, 'This username is already taken!');
        }
    }

    if (!username || username.length < 5) {
        utilityService.addErrorMessage(response, 'Username must be at least 5 symbols!');
    } else {
        if (await isUsernameAvailabale(username) === false) {
            utilityService.addErrorMessage(response, 'This username is already taken!');
        }
    }

    if (!password || password.length < 6) {
        utilityService.addErrorMessage(response, 'Password must be at least 6 symbols long!');
    }

    if (response.successfull) {
        const hash = utilityService.hashPassword(password);
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
        utilityService.addErrorMessage(response, 'Invalid email!');
    }

    if (!password || password.length < 6) {
        utilityService.addErrorMessage(response, 'Password must be at least 6 symbols long!');
    }

    if (response.successfull) {
        const hash = utilityService.hashPassword(password);
        const userResult = await User.findOne({
            attributes: ['id'],
            where: {
                email: email,
                password: hash
            }
        });

        if (userResult === null) {
            utilityService.addErrorMessage(response, 'Invalid login information!');
            return response;
        }

        const userId = userResult.dataValues.id;

        const session = await Session.findOne({
            attributes: ['token'],
            where: {
                userId: userId
            }
        });

        const authToken = session.dataValues.token;
        response.data.authToken = authToken;
    }

    return response;
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

async function authenticateUser(authToken) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    }

    if(!authToken) {
        utilityService.addErrorMessage(response, 'Invalid auth token!');
        return response;
    }

    const sessionResult = await Session.findOne({
        attributes: ['userId'],
        where: {
            token: authToken
        }
    });

    if(sessionResult === null) {
        utilityService.addErrorMessage(response, 'Invalid auth token!');
        return response;
    }

    response.data.userId = sessionResult.dataValues.userId;
    return response;
}

module.exports = {
    authenticateUser,
    register,
    login
};