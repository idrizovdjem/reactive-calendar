import axios from '../axios.js';

async function getForDay(date) {
    const response = await axios.get(`/mood/${date}`);
    return response;
}

async function updateMood(date, mood) {
    const response = await axios.patch(`/mood/${date}`, { mood });
    return response;
}

async function getForRange(startDate, endDate) {
    const response = await axios.get(`/mood/range?startDate=${startDate}&endDate=${endDate}`);
    return response;
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