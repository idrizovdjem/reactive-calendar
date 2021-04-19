const express = require('express');
const authService = require('../services/authService.js');
const todoService = require('../services/todoService.js');
const router = express.Router();

// ? authentication middleware
router.use(async (request, response, next) => {
    // read the authToken from the request headers
    const authToken = request.headers['x-authorization'];
    // make request to get the userId
    const userIdResponse = await authService.authenticateUser(authToken);
    if (!userIdResponse.ok) {
        // if the authentication is not successfull, send response with the authenticatio error messages
        response.json({ response: userIdResponse });
    }

    // get the user id from the userId response
    const userId = userIdResponse.data.userId;
    request.body.userId = userId;

    // continue with the request
    next();
});

router.post('/', async (request, response) => {
    // ? example for the current endpoint
    // ? /todo/

    // get the userId and todo properties from request body
    const { userId, title, description, date, labelText } = request.body;
    // call create from todoService and return response
    const todoResponse = await todoService.create(userId, title, description, date, labelText);
    response.json({ response: todoResponse });
});

router.get('/date/:date', async (request, response) => {
    // ? example for the current endpoint
    // ? /todo/date/20210401

    // get date from request parameters
    const date = request.params.date;
    // get user id from request body
    const userId = request.body.userId;
    // call todoService and return response
    const todosResponse = await todoService.getForDate(userId, date);
    response.json({ response: todosResponse });
});

router.get('/range', async (request, response) => {
    // ? example for the current endpoint
    // ? /todo/range?startDate=20210401&endDate=20210415

    // get startDate and endDate from request query
    const { startDate, endDate } = request.query;
    // get user id from request body
    const userId = request.body.userId;
    // call todoService and return response
    const todosResponse = await todoService.getForRange(userId, startDate, endDate);
    response.json({ response: todosResponse });
});

router.patch('/:todoId/check', async (request, response) => {
    // ? example for the current endpoint
    // ? /todo/15/check

    // get todo id from request parameters
    const todoId = request.params.todoId;
    // get the new checked state from request body
    const newCheckState = request.body.newCheckState;
    // call todoService and update the todo check state
    const todosResponse = await todoService.changeTodoCheckedState(todoId, newCheckState);
    response.json({ response: todosResponse });
});

router.delete('/:todoId', async (request, response) => {
    // ? example for the current endpoint
    // ? /todo/15

    // get todo id from request parameters
    const { todoId } = request.params;
    // call todoService and delete todo object
    const todosResponse = await todoService.deleteTodo(todoId);
    response.json({ response: todosResponse });
});

router.patch('/:todoId', async (request, response) => {
    // ? example for the current endpoint
    // ? /todo/15

    // get todo id from request parameters
    const todoId = request.params.todoId;
    // get todo title and descriptiojn from request body
    const { title, description } = request.body;
    // call todoService and update todo object
    const todosResponse = await todoService.updateTodo(todoId, title, description);
    response.json({ response: todosResponse });
});

module.exports = router;