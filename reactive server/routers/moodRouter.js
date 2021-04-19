const express = require('express');
const moodService = require('../services/moodService.js');
const authService = require('../services/authService.js');
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

router.get('/range', async (request, response) => {
    const { startDate, endDate } = request.query;
    const userId = request.body.userId;
    const dateMoodsResponse = await moodService.getForRange(userId, startDate, endDate);
    response.json({ response: dateMoodsResponse });
});

router.patch('/:date', async (request, response) => {
    const date = request.params.date;
    const { userId, mood } = request.body;
    const dateMoodResponse = await moodService.updateMood(userId, date, mood);
    response.json({ response: dateMoodResponse });
});

router.get('/:date', async (request, response) => {
    const date = request.params.date;
    const userId = request.body.userId;
    const dateMoodResponse = await moodService.getMood(userId, date);
    response.json({ response: dateMoodResponse });
});

module.exports = router;