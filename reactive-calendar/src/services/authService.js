import axios from '../axios.js';

async function register(data) {
    // send post request with data to the back-end api
    // if the response is successfull then the authentication token
    // is saved to the localStorage

    const response = await axios.post('/users/register', data);
    const result = response.data.response;
    if(result.successfull) {
        const authToken = result.data.authToken;
        persistUserData(authToken);
    }

    return result;
}

async function login(data) {
    // send post request with data to the back-end api
    // if the response is successfull then the authentication token
    // is saved to the localStorage

    const response = await axios.post('/users/login', data);
    const result = response.data.response;
    if(result.successfull) {
        const authToken = result.data.authToken;
        persistUserData(authToken);
    }

    return result;
}

function persistUserData(authToken) {
    // save authentication token to the localStorage
    localStorage.setItem('authToken', authToken);
}

function logout() {
    // remove the authentication token from the localStorage
    localStorage.removeItem('authToken');
}

function isUserAuthenticated() {
    // check if the localStorage contains authentication token
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