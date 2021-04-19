import axios from 'axios';

// * production
//axios.defaults.baseURL = 'https://reactive-calendar.glitch.me';

const instance = axios.create({ baseURL: 'http://localhost:5000' });

instance.interceptors.request.use(config => {
    config.headers.common['x-authorization'] = localStorage.getItem('authToken');
    return config;
  });

export default instance;