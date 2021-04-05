const express = require('express');
const authService = require('../services/authService.js');
const todoService = require('../services/todoService.js');
const router = express.Router();

router.use(async (request, response, next) => {
    const { authToken } = request.body;
    const userIdResponse = await authService.authenticateUser(authToken);
    if (!userIdResponse.successfull) {
        response.json({ response: userIdResponse });
    }

    const userId = userIdResponse.data.userId;
    request.body.userId = userId;

    next();
});

router.post('/create', async (request, response) => {
    const { userId, title, description, date, labelText } = request.body;
    const todoResponse = await todoService.create(userId, title, description, date, labelText);
    response.json({ response: todoResponse });
});

router.post('/daily', async (request, response) => {
    const { userId, date } = request.body;
    const todosResponse = await todoService.getForDate(userId, date);
    response.json({ response: todosResponse });
});

router.post('/getForDateRange', async (request, response) => {
    const { userId, startDate, endDate } = request.body;
    const todosResponse = await todoService.getForRange(userId, startDate, endDate);
    response.json({ response: todosResponse });
});

module.exports = router;