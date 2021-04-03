const express = require('express');
const authService = require('../services/authService.js');
const todoService = require('../services/todoService.js');
const router = express.Router();

router.post('/create', async (request, response) => {
    const { authToken } = request.body;
    const userIdResponse = await authService.authenticateUser(authToken);
    if (!userIdResponse.successfull) {
        response.json({ response: userIdResponse });
    } else {
        const userId = userIdResponse.data.userId;
        const { title, description, date, labelText } = request.body;
        const todoResponse = await todoService.create(userId, title, description, date, labelText);
        response.json({ response: todoResponse });
    }
});

router.post('/daily', async (request, response) => {
    const { authToken, date } = request.body;
    const userIdResponse = await authService.authenticateUser(authToken);
    if (!userIdResponse.successfull) {
        response.json({ response: userIdResponse });
    } else {
        const userId = userIdResponse.data.userId;
        const todosResponse = await todoService.getForDate(userId, date);
        response .json({ response: todosResponse });
    }
});

module.exports = router;