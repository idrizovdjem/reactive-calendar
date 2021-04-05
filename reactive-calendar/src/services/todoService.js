import axios from '../axios.js';

async function getDailyTodos(date) {
    // get todos for a date

    const authToken = localStorage.getItem('authToken');
    // send authentication token and current date
    const response = await axios.post('/todo/daily', {
        authToken,
        date
    });
    
    const todosResponse = response.data.response;
    return todosResponse;
}

async function getTodosForDates(startDate, endDate) {
    // get todos for range of two dates

    const authToken = localStorage.getItem('authToken');
    // send authentication token, startDate and endDate
    const response = await axios.post('/todo/getForDateRange', {
        authToken,
        startDate,
        endDate
    });

    const todosResponse = response.data.response;
    return todosResponse;
}

const todoService = {
    getDailyTodos,
    getTodosForDates
};

export default todoService;