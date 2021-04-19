const express = require('express');
const authService = require('../services/authService.js');
const todoService = require('../services/todoService.js');
const router = express.Router();

router.use(async (request, response, next) => {
    const authToken= request.headers['x-authorization'];
    const userIdResponse = await authService.authenticateUser(authToken);
    if (!userIdResponse.successfull) {
        response.json({ response: userIdResponse });
    }

    const userId = userIdResponse.data.userId;
    request.body.userId = userId;

    next();
});

router.post('/', async (request, response) => {
    const { userId, title, description, date, labelText } = request.body;
    const todoResponse = await todoService.create(userId, title, description, date, labelText);
    response.json({ response: todoResponse });
});

router.get('/date/:date', async (request, response) => {
    const date = request.params.date;
    const userId = request.body.userId;
    const todosResponse = await todoService.getForDate(userId, date);
    response.json({ response: todosResponse });
});

router.get('/range', async (request, response) => {
    const { startDate, endDate } = request.query;
    const userId = request.body.userId;
    const todosResponse = await todoService.getForRange(userId, startDate, endDate);
    response.json({ response: todosResponse });
});

router.patch('/:todoId/check', async (request, response) => {
    const todoId = request.params.todoId;
    const newCheckState = request.body.newCheckState;
    const todosResponse = await todoService.changeTodoCheckedState(todoId, newCheckState);
    response.json({ response: todosResponse });
});

router.delete('/:todoId', async (request, response) => {
    const { todoId } = request.params;
    const todosResponse = await todoService.deleteTodo(todoId);
    response.json({ response: todosResponse });
});

router.patch('/:todoId', async (request, response) => {
    const todoId = request.params.todoId;
    const { title, description } = request.body;
    const todosResponse = await todoService.updateTodo(todoId, title, description);
    response.json({ response: todosResponse });
});

module.exports = router;