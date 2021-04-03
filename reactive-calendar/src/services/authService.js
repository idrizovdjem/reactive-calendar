import axios from '../axios.js';

async function register(data) {
    const response = await axios.post('/users/register', data);
    const result = response.data.response;
    if(result.successfull) {
        const authToken = result.data.authToken;
        persistUserData(authToken);
    }

    return result;
}

async function login(data) {
    const response = await axios.post('/users/login', data);
    const result = response.data.response;
    if(result.successfull) {
        const authToken = result.data.authToken;
        persistUserData(authToken);
    }

    return result;
}

function persistUserData(authToken) {
    localStorage.setItem('authToken', authToken);
}

function logout() {
    localStorage.removeItem('authToken');
}

function isUserAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
}

const authService = {
    isUserAuthenticated,
    register,
    login,
    logout
};

export default authService;