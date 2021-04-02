import axios from '../axios.js';

async function register(data) {
    const response = await axios.post('/users/register', data);
    const result = response.data.result;
    if(result.successfull) {
        const authToken = result.data.authToken;
        localStorage.setItem('authToken', authToken);
    }

    return result;
}

function isUserAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
}

const authService = {
    register,
    isUserAuthenticated
};

export default authService;