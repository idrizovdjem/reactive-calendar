import axios from '../axios.js';

async function getForDay(date) {
    const requestData = buildRequestData({ date });
    const response = await axios.post('/mood/getForDay', requestData);
    return response;
}

async function updateMood(date, mood) {
    const requestData = buildRequestData({ date, mood });
    const response = await axios.post('/mood/update', requestData);
    return response;
}

async function getForRange(startDate, endDate) {
    const requestData = buildRequestData({ startDate, endDate });
    const response = await axios.post('/mood/getForRange', requestData);
    return response;
}

function buildRequestData(data) {
    const authToken = localStorage.getItem('authToken');
    data.authToken = authToken;
    return data;
}

const moodService = {
    getForDay,
    updateMood,
    getForRange
};

export default moodService;