const utilityService = require('./utilityService.js');
const labelService = require('./labelService.js');
const { Todo } = require('../data/context.js');

async function create(userId, title, description, date, labelText) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!title) {
        utilityService.addErrorMessage(response, 'Todo title is required!');
    } else {
        title = title.trim();
        if(title.length < 1) {
            utilityService.addErrorMessage(response, 'Todo title must be at least symbol long!');
        }
    }

    if(!description) {
        utilityService.addErrorMessage(response, 'Todo description is required!');
    } else {
        description = description.trim();
        if(description.length < 1) {
            utilityService.addErrorMessage(response, 'Todo description must be at least symbol long!');
        }
    }

    if(!date) {
        utilityService.addErrorMessage(response, 'Todo date is required!');
    } else {
        date = date.trim();
        // ? date format: `{year}{month}{day}`;
        // ? example '20210403' (03 Apr 2021)
        if(date.length !== 8) {
            utilityService.addErrorMessage(response, 'Invalid date!');
        }

        date = Number(date);
        if(Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    const labelIdResponse = await labelService.getByText(labelText);
    if(!labelIdResponse.successfull) {
        labelIdResponse.errorMessages.forEach((message) => {
            utilityService.addErrorMessage(response, message);
        });
    }
    
    if(response.successfull) {
        const labelId = labelIdResponse.data.labelId;

        const todo = await Todo.create({
            userId,
            title,
            description,
            date,
            labelId
        });

        response.data.todo = todo;
    }

    return response;
}

module.exports = {
    create
};