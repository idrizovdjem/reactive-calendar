const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');

router.post('/login', async(request, response) => {
    const { email, password } = request.body;
    const loginResponse = await authService.login(email, password);
    response.json({ response: loginResponse });
});

router.post('/register', async(request, response) => {
    const { email, username, password } = request.body;
    const registerResponse = await authService.register(email, username, password);
    response.json({ response: registerResponse });
});

module.exports = router;