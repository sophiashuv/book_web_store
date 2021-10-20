import axios from 'axios';

const tokenFromStorage = localStorage.getItem('authToken');

let instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        anon_token: tokenFromStorage,
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
            anon_token: authToken,
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
            anon_token: authToken,
        }
    });

    localStorage.setItem('authToken', authToken);

    return response.data;
};

export const createBook = async (newBook) => {
    const response = await instance.post("/books", {
        body: newBook,
    });

    return response.data;
}

// export const createBook = async (newBook) => {
//     alert(newBook)
//     const response = await instance.post("/books", {
//         body: newBook,
//     });
//
//     return response.data;
// };

export const discount = async (genres, disc) => {
    const response = await instance.put("/books", {
        body: {
            genres: genres,
            discount: disc,
        },
    });

    return response.data;
};


export const addToCart = async (new_order) => {
    await instance.post('/order');

    const response = await instance.put("/order", {
        body: new_order,
    });

    return response.data;

};
