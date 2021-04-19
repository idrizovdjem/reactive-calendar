const utilityService = require('./utilityService.js');
const { DateMood } = require('../data/context.js');
const { Op } = require('sequelize');
const possibleMoods = ['Excellent', 'Good', 'Average', 'Bad', 'Miserable'];

async function updateMood(userId, date, mood) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };
    
    if(!date) {
        utilityService.addErrorMessage(response, 'Date is required!');
    } else {
        date = parseInt(date);
        if(Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    if(!mood) {
        utilityService.addErrorMessage(response, 'Mood is required!');
    } else {
        mood = mood.trim();
        if(!possibleMoods.includes(mood)) {
            utilityService.addErrorMessage(response, 'Invalid mood!');
        }
    }

    if(response.successfull) {
        let dateMood = await DateMood.findOne({
            where: {
                userId: userId,
                date: date
            }
        });

        if(dateMood === null) {
            // create
            dateMood = await DateMood.create({
                userId,
                date,
                mood
            });
        } else {
            // update
            dateMood.mood = mood;
            await dateMood.save();
        }

        response.data.dateMood = dateMood;
    }

    return response;
}

async function getMood(userId, date) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!date) {
        utilityService.addErrorMessage(response, 'Date is required!');
    } else {
        date = parseInt(date);
        if(Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    if(response.successfull) {
        let dateMood = await DateMood.findOne({
            attributes: ['mood'],
            where: {
                userId: userId,
                date: date
            }
        });

        if(dateMood === null) {
            dateMood = await DateMood.create({
                userId,
                date,
                mood: 'Average'
            });
        }

        response.data.moodText = dateMood.dataValues.mood;
    }

    return response;
}

async function getForRange(userId, startDate, endDate) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!startDate) {
        utilityService.addErrorMessage(response, 'Start date is required!');
    } else {
        startDate = parseInt(startDate);
        if(Number.isNaN(startDate)) {
            utilityService.addErrorMessage(response, 'Invalid start date format!');
        }
    }

    if(!endDate) {
        utilityService.addErrorMessage(response, 'End date is required!');
    } else {
        endDate = parseInt(endDate);
        if(Number.isNaN(endDate)) {
            utilityService.addErrorMessage(response, 'Invalid end date format!');
        }
    }

    if(response.successfull) {
        const dateMoods = await DateMood.findAll({
            attributes: ['mood', 'date'],
            where: {
                userId: userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

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