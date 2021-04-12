const utilityService = require('./utilityService.js');
const labelService = require('./labelService.js');
const { Todo } = require('../data/context.js');
const { Op } = require('sequelize');

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
        // ? date format: `{year}{month}{day}`;
        // ? example '20210403' (03 Apr 2021)

        date = parseInt(date);
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

async function getForDate(userId, date) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!date) {
        utilityService.addErrorMessage(response, 'Invalid date!');
    } else {
        // ? date format: `{year}{month}{day}`;
        // ? example '20210403' (03 Apr 2021)
        date = parseInt(date);
        if(Number.isNaN(date)) {
            utilityService.addErrorMessage(response, 'Invalid date format!');
        }
    }

    if(response.successfull) {
        const todosArray = await Todo.findAll({
            where: {
                userId: userId,
                date: date
            }
        });

        const todos = [];
        for(const todo of todosArray) {
            const todoObject = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                isChecked: todo.isChecked
            };

            const todoLabelResponse = await labelService.getById(todo.labelId);
            if(todoLabelResponse.successfull) {
                todoObject.label = todoLabelResponse.data;
                todos.push(todoObject);
            } else {
                todoLabelResponse.errorMessages.forEach(message => {
                    utilityService.addErrorMessage(response, message);
                });
            }   
        }

        response.data.todos = todos;
        return response;
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
        utilityService.addErrorMessage(response, 'Missing startDate');
    } else {
        startDate = parseInt(startDate);
        if(Number.isNaN(startDate)) {
            utilityService.addErrorMessage(response, 'Invalid startDate format!');
        }
    }

    if(!endDate) {
        utilityService.addErrorMessage(response, 'Missing endDate');
    } else {
        endDate = parseInt(endDate);
        if(Number.isNaN(endDate)) {
            utilityService.addErrorMessage(response, 'Invalid endDate format!');
        }
    }

    if(response.successfull) {
        const todosArray = await Todo.findAll({
            attributes: ['date', 'title', 'labelId'],
            where: {
                userId: userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const todos = [];
        for(const todo of todosArray) {
            const todoObject = {
                'title': todo.title,
                'date': todo.date
            };

            const todoLabelResponse = await labelService.getById(todo.labelId);
            if(todoLabelResponse.successfull) {
                todoObject.label = todoLabelResponse.data;
                todos.push(todoObject);
            } else {
                todoLabelResponse.errorMessages.forEach(message => {
                    utilityService.addErrorMessage(response, message);
                });
            }   
        }

        response.data.todos = todos;
        return response;
    }

    return response;
}

async function changeTodoCheckedState(todoId, newCheckState) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    const todo = await Todo.findOne({
        where: {
            id: todoId
        }
    });

    if(todo === null) {
        utilityService.addErrorMessage(response, 'Invalid todo id');
        return response;
    }

    todo.isChecked = newCheckState;
    await todo.save();

    return response;
}

async function deleteTodo(todoId) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!todoId) {
        utilityService.addErrorMessage(response, 'Invalid todo id!');
    }

    if(response.successfull) {
        const todo = await Todo.findOne({
            where: {
                id: todoId
            }
        });

        if(todo === null) {
            return response;
        }

        await todo.destroy();
    }

    return response;
}

async function updateTodo(todoId, title, description) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!todoId) {
        utilityService.addErrorMessage(response, 'Invalid todo id!');
    }

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

    if(response.successfull) {
        const todo = await Todo.findOne({
            where: {
                id: todoId
            }
        });

        if(todo === null) {
            return response;
        }

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