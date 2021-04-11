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

function getMoodColor(mood) {
    switch(mood) {
        case 'Excellent': return '#008000';
        case 'Good': return '#38b000';
        case 'Average': return '#ccff33';
        case 'Bad': return '#f79d65';
        case 'Miserable': return '#f27059';
        default: return 'white';
    }
}

const moodService = {
    getForDay,
    updateMood,
    getForRange,
    getMoodColor
};

export default moodService;