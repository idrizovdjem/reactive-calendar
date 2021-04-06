import axios from 'axios';

// * production
axios.defaults.baseURL = 'https://reactive-calendar.glitch.me';

// * development
//axios.defaults.baseURL = 'http://localhost:5000';

export default axios;