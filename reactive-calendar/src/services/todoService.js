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

function buildRequestData(data) {
    const authToken = localStorage.getItem('authToken');
    data.authToken = authToken;
    return data;
}

const todoService = {
    getDailyTodos,
    getTodosForDates,
    create
};

export default todoService;