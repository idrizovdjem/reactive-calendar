const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');

router.post('/login', async(request, response) => {
    // ? example for the current endpoint
    // ? /users/login

    // get the email and password from the request body
    const { email, password } = request.body;
    // call authService and return response
    const loginResponse = await authService.login(email, password);
    response.json({ response: loginResponse });
});

router.post('/register', async(request, response) => {
    // ? example for the current endpoint
    // ? /users/register

    // get email, username and password from request body
    const { email, username, password } = request.body;
    // cal authService and register the user
    const registerResponse = await authService.register(email, username, password);
    response.json({ response: registerResponse });
});

module.exports = router;