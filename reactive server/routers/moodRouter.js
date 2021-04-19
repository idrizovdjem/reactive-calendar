const express = require('express');
const moodService = require('../services/moodService.js');
const authService = require('../services/authService.js');
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

router.get('/range', async (request, response) => {
    // ? example for the current endpoint
    // ? /mood/range?startDate=20210401&endDate=20210415

    // get startDate and endDate from request query
    const { startDate, endDate } = request.query;
    // get the authenticated user id from the body
    const userId = request.body.userId;
    // fetch dateMood objects and return the response
    const dateMoodsResponse = await moodService.getForRange(userId, startDate, endDate);
    response.json({ response: dateMoodsResponse });
});

router.patch('/:date', async (request, response) => {
    // ? example for the current endpoint
    // ? /mood/20210401

    // get the date from the request parameters
    const date = request.params.date;
    // get the userId and mood from the request body
    const { userId, mood } = request.body;
    // call moodService and update dateMood object, then return response
    const dateMoodResponse = await moodService.updateMood(userId, date, mood);
    response.json({ response: dateMoodResponse });
});

router.get('/:date', async (request, response) => {
    // ? example for the current endpoint
    // ? /mood/20210401

    // get date from request parameters
    const date = request.params.date;
    // get user id from request body
    const userId = request.body.userId;
    // call moodService and get the mood for the current date
    const dateMoodResponse = await moodService.getMood(userId, date);
    response.json({ response: dateMoodResponse });
});

module.exports = router;