import axios from '../axios.js';

async function getDailyTodos(date) {
    // get todos for a date
    // send authentication token and current date
    const requestData = buildRequestData({ date });
    const response = await axios.post('/todo/daily', requestData);
    
    const todosResponse = response.data.response;
    return todosResponse;
}

async function getTodosForDates(startDate, endDate) {
    // get todos for range of two dates
    const data = {
        startDate,
        endDate
    };
    const requestData = buildRequestData(data);
    // send authentication token, startDate and endDate
    
    const response = await axios.post('/todo/getForDateRange',requestData);
    const todosResponse = response.data.response;
    return todosResponse;
}

async function create(data) {
    const requestData = buildRequestData(data);
    const response = await axios.post('/todo/create', requestData);
    return response;
}

async function changeTodoCheckedState(todoId, newCheckState) {
    const requestData = buildRequestData({ todoId, newCheckState });
    const response = await axios.post('/todo/updateCheck', requestData);
    return response;
}

async function deleteTodo(todoId) {
    const requestData = buildRequestData({ todoId });
    const response = await axios.post('/todo/delete', requestData);
    return response;
}

async function updateTodo(todoId, title, description) {
    const requestData = buildRequestData({ todoId, title, description });
    const response = await axios.post('/todo/update', requestData);
    return response;
}

function buildRequestData(data) {
    const authToken = localStorage.getItem('authToken');
    data.authToken = authToken;
    return data;
}

const todoService = {
    changeTodoCheckedState,
    getTodosForDates,
    getDailyTodos,
    deleteTodo,
    updateTodo,
    create
};

export default todoService;