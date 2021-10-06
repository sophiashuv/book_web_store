import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
});

export const findBooks = async () => {
    const response = await instance.get('/books', {
        params: {}
    });

    return response.data;
};