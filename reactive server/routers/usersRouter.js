const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');

router.post('/login', async(request, response) => {
    const { email, password } = request.body;
    const result = await authService.login(email, password);
    response.json({ result });
});

router.post('/register', async(request, response) => {
    const { email, username, password } = request.body;
    const result = await authService.register(email, username, password);
    response.json({ result });
});

module.exports = router;