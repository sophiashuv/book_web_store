import axios from 'axios';

const tokenFromStorage = localStorage.getItem('authToken');

let instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        Authorization: tokenFromStorage,
    },
});

export const findBooks = async (filters = {}) => {
    const response = await instance.get('/books', {
        params: filters,
    });

    return response.data;
};

export const findBook = async (id) => {
    const response = await instance.get('/books/' + id, {
        params: {}
    });

    return response.data;
};

export const getBookAuthors = async (Bookid) => {
    const response = await instance.get('/books/' + Bookid + '/authors', {
        params: {}
    });

    return response.data;
};

export const signin = async (email, password) => {
    const response = await instance.post('/signin/', {
        email,
        password,
    });

    const authToken = response.data.authToken;

    instance = axios.create({
        baseURL: 'http://localhost:3001',
        timeout: 1000,
        headers: {
            Authorization: authToken,
        }
    });

    localStorage.setItem('authToken', authToken);

    return response.data;
};

export const signup = async (email, password) => {
    const response = await instance.post('/signup/', {
        email,
        password,
    });

    const authToken = response.data.authToken;

    instance = axios.create({
        baseURL: 'http://localhost:3001',
        timeout: 1000,
        headers: {
            Authorization: authToken,
        }
    });

    localStorage.setItem('authToken', authToken);

    return response.data;
};