const express = require('express');
const labelService = require('../services/labelService.js');
const router = express.Router();

router.get('/all', async (request, response) => {
    // ? example for the current endpoint
    // ? /labels/all

    const labelsResponse = await labelService.getAll();
    response.json({ response: labelsResponse });
});

module.exports = router;