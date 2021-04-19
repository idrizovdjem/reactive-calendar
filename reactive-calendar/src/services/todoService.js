import axios from '../axios.js';

async function getDailyTodos(date) {
    // get todos for a date
    // send authentication token and current date
    const response = await axios.get(`/todo/date/${date}`);
    
    const todosResponse = response.data.response;
    return todosResponse;
}

async function getTodosForDates(startDate, endDate) {
    // get todos for range of two dates
    // send authentication token, startDate and endDate
    
    const response = await axios.get(`/todo/range?startDate=${startDate}&endDate=${endDate}`);
    const todosResponse = response.data.response;
    return todosResponse;
}

async function create(data) {
    const response = await axios.post('/todo/', data);
    return response;
}

async function changeTodoCheckedState(todoId, newCheckState) {
    const response = await axios.patch(`/todo/${todoId}/check`, { newCheckState });
    return response;
}

async function deleteTodo(todoId) {
    const response = await axios.delete(`/todo/${todoId}`);
    return response;
}

async function updateTodo(todoId, title, description) {
    const response = await axios.patch(`/todo/${todoId}`, { title, description });
    return response;
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