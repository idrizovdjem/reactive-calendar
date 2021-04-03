import axios from '../axios.js';

async function getDailyTodos(date) {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.post('/todo/daily', {
        authToken,
        date
    });
    const todosResponse = response.data.response;
    return todosResponse;
}

const todoService = {
    getDailyTodos
};

export default todoService;