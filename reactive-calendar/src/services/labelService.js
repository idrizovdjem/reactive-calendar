import axios from '../axios.js';

async function getAll() {
    const response = await axios.get('/labels/all');
    const labelsResponse = response.data.response;
    return labelsResponse;
}

const labelService = {
    getAll
};

export default labelService;