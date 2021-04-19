const { User, Session } = require('../data/context.js');
const { v4 } = require('uuid');
const utilityService = require('./utilityService.js');

async function register(email, username, password) {
    const response = utilityService.createResponse();

    // * simple input data validations
    if (!email) {
        utilityService.addErrorMessage(response, 'Invalid email!');
    } else {
        email = email.trim();
        // check if the email length is at least 5 symbols
        if(email.length < 5) {
            utilityService.addErrorMessage(response, 'Email must be at least 5 symbols!');
        } else {

            // check if the email is available
            if (await isEmailAvailable(email) === false) {
                utilityService.addErrorMessage(response, 'This email is already taken!');
            }
        }
    }

    if (!username) {
        utilityService.addErrorMessage(response, 'Username is required!');
    } else {
        username = username.trim();
        // check if the username length is at least 5 symbols long
        if(username.length < 5) {
            utilityService.addErrorMessage(response, 'Username must be at least 5 symbols!');
        } else {
            // check if the username is available
            if (await isUsernameAvailabale(username) === false) {
                utilityService.addErrorMessage(response, 'This username is already taken!');
            }
        }
    }

    // validate the password
    if (!password) {
        utilityService.addErrorMessage(response, 'Password is requried!');
    } else {
        password = password.trim();
        // check if the password is at least 6 symbols long
        if(password.length < 6) {
            utilityService.addErrorMessage(response, 'Password must be at least 6 symbols long!');
        }
    }

    if (response.ok) {
        // hash password
        const hash = utilityService.hashPassword(password);
        // create new user
        const user = await User.create({ email, username, password: hash });

        // create session token for the user
        const uuidToken = v4();
        const session = await Session.create({
            userId: user.id,
            token: uuidToken
        });

        // add the access token to the response data object
        response.data.authToken = session.token;
    }

    return response;
}

async function login(email, password) {
    const response = utilityService.createResponse();

    // * simple input data validations
    if (!email) {
        utilityService.addErrorMessage(response, 'Invalid email!');
    } else {
        email = email.trim();
        // check if the email is at least 5 symbols
        if(email.length < 5) {
            utilityService.addErrorMessage(response, 'Email must be at least 5 symbols!');
        }
    }

    // validate password
    if (!password) {
        utilityService.addErrorMessage(response, 'Password is required!');
    } else {
        password = password.trim();
        // check if the password is at least 6 symbols long
        if(password.length < 6) {
            utilityService.addErrorMessage(response, 'Password must be at least 6 symbols long!');
        }
    }

    // if the validation succeeded
    if (response.ok) {
        // hash the input password
        const hash = utilityService.hashPassword(password);
        // search the db for user matching the input username and hashed password.
        const userResult = await User.findOne({
            attributes: ['id'],
            where: {
                email: email,
                password: hash
            }
        });

        // if the user is not found(not existent)
        if (userResult === null) {
            // append error message to the response and return it
            utilityService.addErrorMessage(response, 'Invalid login information!');
            return response;
        }

        // get the found user id
        const userId = userResult.dataValues.id;

        // search the db for the acces token of the user
        const session = await Session.findOne({
            attributes: ['token'],
            where: {
                userId: userId
            }
        });

        // get the authToken
        const authToken = session.dataValues.token;
        // add acces token to the response data
        response.data.authToken = authToken;
    }

    return response;
}

async function isEmailAvailable(email) {
    // search the db for user matching the input email
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    // return if the user is not found(email is available)
    return user === null;
}

async function isUsernameAvailabale(username) {
    // search the db for user matching the input username
    const user = await User.findOne({
        where: {
            username: username
        }
    });

    // return if the user is not found(username is available)s
    return user === null;
}

async function authenticateUser(authToken) {
    const response = utilityService.createResponse();

    // check if access token is passed
    if(!authToken) {
        utilityService.addErrorMessage(response, 'Missing auth token!');
        return response;
    }

    // search the db for session with matching the access token
    const sessionResult = await Session.findOne({
        attributes: ['userId'],
        where: {
            token: authToken
        }
    });

    // if the session result is null(not found)
    if(sessionResult === null) {
        // append error message to the response and return it
        utilityService.addErrorMessage(response, 'Invalid auth token!');
        return response;
    }

    // add userId to the response data
    response.data.userId = sessionResult.dataValues.userId;
    return response;
}

module.exports = {
    authenticateUser,
    register,
    login
};