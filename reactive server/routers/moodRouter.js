const express = require('express');
const moodService = require('../services/moodService.js');
const authService = require('../services/authService.js');
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

router.post('/update', async (request, response) => {
    const { userId, date, mood } = request.body;
    const dateMoodResponse = await moodService.updateMood(userId, date, mood);
    response.json({ response: dateMoodResponse });
});

router.post('/getForDay', async (request, response) => {
    const { userId, date } = request.body;
    const dateMoodResponse = await moodService.getMood(userId, date);
    response.json({ response: dateMoodResponse });
});

router.post('/getForRange', async (request, response) => {
    const { userId, startDate, endDate } = request.body;
    const dateMoodsResponse = await moodService.getForRange(userId, startDate, endDate);
    response.json({ response: dateMoodsResponse });
});

module.exports = router;