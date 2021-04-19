const utilityService = require('./utilityService.js');
const labelService = require('./labelService.js');
const { Todo } = require('../data/context.js');
const { Op } = require('sequelize');

async function create(userId, title, description, date, labelText) {
    const response = utilityService.createResponse();

    // validate title
    if(!title) {
        utilityService.addErrorMessage(response, 'Todo title is required!');
    } else {
        title = title.trim();
        // check if the passed in title is valid string
        if(title.length < 1) {
            utilityService.addErrorMessage(response, 'Todo title must be at least symbol long!');
        }
    }

    // validate description
    if(!description) {
        utilityService.addErrorMessage(response, 'Todo description is required!');
    } else {
        description = description.trim();
        // check if the passed in description is valid string
        if(description.length < 1) {
            utilityService.addErrorMessage(response, 'Todo description must by at least symbol long!');
        }
    }
    

    // validate date
    if(!date) {
        utilityService.addErrorMessage(response, 'Todo date is required!');
    } else {
        // ? date format: `{year}{month}{day}`;
        // ? example '20210403' (03 Apr 2021)

        date = parseInt(date);
        // check if the passed in date is int number
        if(Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    // get label id by label text
    const labelIdResponse = await labelService.getByText(labelText);
    if(!labelIdResponse.ok) {
        // if the labelId response failed, append all error messages to the current response
        labelIdResponse.errorMessages.forEach((message) => {
            utilityService.addErrorMessage(response, message);
        });
    }
    
    if(response.ok) {
        // get label id
        const labelId = labelIdResponse.data.labelId;

        // create new todo object
        const todo = await Todo.create({
            userId,
            title,
            description,
            date,
            labelId
        });

        // add todo to response data
        response.data.todo = todo;
    }

    return response;
}

async function getForDate(userId, date) {
    const response = utilityService.createResponse();

    // validate date
    if(!date) {
        utilityService.addErrorMessage(response, 'Invalid date!');
    } else {
        // ? date format: `{year}{month}{day}`;
        // ? example '20210403' (03 Apr 2021)

        date = parseInt(date);
        // check if the date is int number
        if(Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    if(response.ok) {
        // search the db for all todo objects matching the userId and date
        const todosArray = await Todo.findAll({
            where: {
                userId: userId,
                date: date
            }
        });

        // map found todos
        const todos = [];
        for(const todo of todosArray) {
            const todoObject = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                isChecked: todo.isChecked
            };

            // get todo label by id
            const todoLabelResponse = await labelService.getById(todo.labelId);
            if(todoLabelResponse.ok) {
                // add found label to todo object
                todoObject.label = todoLabelResponse.data;
                todos.push(todoObject);
            } else {
                // if label is not found, append all error messages to the response
                todoLabelResponse.errorMessages.forEach(message => {
                    utilityService.addErrorMessage(response, message);
                });
            }   
        }

        // add todo array to response data
        response.data.todos = todos;
        return response;
    }

    return response;
}

async function getForRange(userId, startDate, endDate) {
    const response = utilityService.createResponse();

    // validate startDate
    if(!startDate) {
        utilityService.addErrorMessage(response, 'Missing startDate');
    } else {
        startDate = parseInt(startDate);
        // check if the startDate is int numer
        if(Number.isNaN(startDate)) {
            utilityService.addErrorMessage(response, 'Invalid startDate format!');
        }
    }

    // validate endDate
    if(!endDate) {
        utilityService.addErrorMessage(response, 'Missing endDate');
    } else {
        endDate = parseInt(endDate);
        // check if the endDate is int number
        if(Number.isNaN(endDate)) {
            utilityService.addErrorMessage(response, 'Invalid endDate format!');
        }
    }

    if(response.ok) {
        // search the db for all todo objects that match userId and date between startDate and endDate
        const todosArray = await Todo.findAll({
            attributes: ['date', 'title', 'labelId'],
            where: {
                userId: userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        // map found todos
        const todos = [];
        for(const todo of todosArray) {
            const todoObject = {
                'title': todo.title,
                'date': todo.date
            };

            // get label by label id
            const todoLabelResponse = await labelService.getById(todo.labelId);
            if(todoLabelResponse.ok) {
                // add the found label to the todo object
                todoObject.label = todoLabelResponse.data;
                todos.push(todoObject);
            } else {
                // append all error messages to the current response
                todoLabelResponse.errorMessages.forEach(message => {
                    utilityService.addErrorMessage(response, message);
                });
            }   
        }

        // add todo array to response data
        response.data.todos = todos;
        return response;
    }

    return response;
}

async function changeTodoCheckedState(todoId, newCheckState) {
    const response = utilityService.createResponse();

    // search the db for todo object matching passed todoId
    const todo = await Todo.findOne({
        where: {
            id: todoId
        }
    });

    if(todo === null) {
        // if the todo object is not found, add error message and return response
        utilityService.addErrorMessage(response, 'Invalid todo id');
        return response;
    }

    // update todo check state
    todo.isChecked = newCheckState;
    await todo.save();

    return response;
}

async function deleteTodo(todoId) {
    const response = utilityService.createResponse();

    // validate passed todoId
    if(!todoId) {
        utilityService.addErrorMessage(response, 'Invalid todo id!');
    }

    if(response.ok) {
        // search the db for todo object matching passed todoId
        const todo = await Todo.findOne({
            where: {
                id: todoId
            }
        });

        if(todo === null) {
            // if the todo is not found, add error message and return response
            utilityService.addErrorMessage(response, 'Todo not found!');
            return response;
        }

        // remove todo object
        await todo.destroy();
    }

    return response;
}

async function updateTodo(todoId, title, description) {
    const response = utilityService.createResponse();

    // validate todoId
    if(!todoId) {
        utilityService.addErrorMessage(response, 'Invalid todo id!');
    }

    // validate title
    if(!title) {
        utilityService.addErrorMessage(response, 'Todo title is required!');
    } else {
        title = title.trim();
        // check if the title is at least 1 symbol
        if(title.length < 1) {
            utilityService.addErrorMessage(response, 'Todo title must be at least symbol long!');
        }
    }

    // validate description
    if(!description) {
        utilityService.addErrorMessage(response, 'Todo description is required!');
    } else {
        description = description.trim();
        // check if the description length is at least 1 symbol
        if(description.length < 1) {
            utilityService.addErrorMessage(response, 'Todo description must be at least symbol long!');
        }
    }

    if(response.ok) {
        // search the db for todo object matching passed todoId
        const todo = await Todo.findOne({
            where: {
                id: todoId
            }
        });

        if(todo === null) {
            // if the todo object is not found, add error message and return response
            utilityService.addErrorMessage(response, 'Todo not found!');
            return response;
        }

        // update todo object
        todo.title = title;
        todo.description = description;
        await todo.save();
    }

    return response;
}

module.exports = {
    create,
    deleteTodo,
    getForDate,
    updateTodo,
    getForRange,
    changeTodoCheckedState
};