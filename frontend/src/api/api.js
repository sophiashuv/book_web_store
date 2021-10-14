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