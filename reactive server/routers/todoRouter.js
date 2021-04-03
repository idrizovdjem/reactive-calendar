const express = require('express');
const authService = require('../services/authService.js');
const todoService = require('../services/todoService.js');
const router = express.Router();

router.post('/create', async (request, response) => {
    const { authToken } = request.body;
    const userIdResponse = await authService.authenticateUser(authToken);
    if(!userIdResponse.successfull) {
        response.json({ userIdResponse });
    }

    const userId = userIdResponse.data.userId;
    const { title, description, date, labelText } = request.body;
    const todoResponse = await todoService.create(userId, title, description, date, labelText);
    response.json({ todoResponse });
});

module.exports = router;