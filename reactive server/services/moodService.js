const utilityService = require('./utilityService.js');
const { DateMood } = require('../data/context.js');
const { Op } = require('sequelize');
const possibleMoods = ['Excellent', 'Good', 'Average', 'Bad', 'Miserable'];

async function updateMood(userId, date, mood) {
    const response = utilityService.createResponse();

    // validate date
    if (!date) {
        utilityService.addErrorMessage(response, 'Date is required!');
    } else {
        date = parseInt(date);
        // check if the passed date is int number
        if (Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    // validate mood
    if (!mood) {
        utilityService.addErrorMessage(response, 'Mood is required!');
    } else {
        mood = mood.trim();
        // check if the passed mood is contained in the possibleMoods array
        if (!possibleMoods.includes(mood)) {
            utilityService.addErrorMessage(response, 'Invalid mood!');
        }
    }

    if (response.ok) {
        // search the db for dateMood object matching the passed in date and userId
        let dateMood = await DateMood.findOne({
            where: {
                userId: userId,
                date: date
            }
        });

        if (dateMood === null) {
            // if the dateMood object is not found, then create new object
            dateMood = await DateMood.create({
                userId,
                date,
                mood
            });
        } else {
            // otherwise, the found dateObject is updated
            dateMood.mood = mood;
            await dateMood.save();
        }

        // add dateMood object to the response data
        response.data.dateMood = dateMood;
    }

    return response;
}

async function getMood(userId, date) {
    const response = utilityService.createResponse();

    // validate date
    if (!date) {
        utilityService.addErrorMessage(response, 'Date is required!');
    } else {
        date = parseInt(date);
        // check if the passed in date is int number
        if (Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    if (response.ok) {
        // search the db for dateMood object matching the input date and userId
        let dateMood = await DateMood.findOne({
            attributes: ['mood'],
            where: {
                userId: userId,
                date: date
            }
        });

        if (dateMood === null) {
            // if the dateMood object is not found, create new with default mood value 'Average'
            dateMood = await DateMood.create({
                userId,
                date,
                mood: 'Average'
            });
        }

        // add the mood to the response data
        response.data.moodText = dateMood.dataValues.mood;
    }

    return response;
}

async function getForRange(userId, startDate, endDate) {
    const response = utilityService.createResponse();

    // validate startDate
    if (!startDate) {
        utilityService.addErrorMessage(response, 'Start date is required!');
    } else {
        startDate = parseInt(startDate);
        // check if the passed in startDate is int number
        if (Number.isNaN(startDate)) {
            utilityService.addErrorMessage(response, 'Invalid start date format!');
        }
    }

    // validate endDate
    if (!endDate) {
        utilityService.addErrorMessage(response, 'End date is required!');
    } else {
        endDate = parseInt(endDate);
        // check if the passed in endDate is int number
        if (Number.isNaN(endDate)) {
            utilityService.addErrorMessage(response, 'Invalid end date format!');
        }
    }

    if (response.ok) {
        // search the db for dateMood objects matching userId and date between startDate and endDate
        const dateMoods = await DateMood.findAll({
            attributes: ['mood', 'date'],
            where: {
                userId: userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        // add mapped dateMoods to the response data
        response.data.dateMoods = dateMoods.map(dateMood => {
            const { mood, date } = dateMood.dataValues;
            return { mood, date };
        });
    }

    return response;
}

module.exports = {
    updateMood,
    getMood,
    getForRange
};