const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');

router.post('/login', async(request, response) => {
    // TODO: implement 
    response.json({ successfull: true });
});

router.post('/register', async(request, response) => {
    const { email, username, password } = request.body;
    const result = await authService.register(email, username, password);
    response.json({ result });
});

module.exports = router;