import axios from 'axios';
import jwt from 'jsonwebtoken'

const tokenFromStorage = localStorage.getItem('authToken');

let instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        Authorization: tokenFromStorage,
    },
});

export let role;

if (tokenFromStorage){
    const decoded = jwt.decode(tokenFromStorage);
    role = decoded.role;
}

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

export const findAuthor = async (id) => {
    const response = await instance.get('/authors/' + id, {
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
    const decoded = jwt.decode(authToken);
    role = decoded.role;
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
    const decoded = jwt.decode(authToken);
    role = decoded.role;

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

export const createBook = async (newBook) => {
    const response = await instance.post("/books", {
        body: newBook,
    });

    return response.data;
}

export const createAuthor = async (newAuthor) => {
    const response = await instance.post("/authors", {
        body: newAuthor,
    });

    return response.data;
}

export const add_discount = async (disc) => {
    const response = await instance.put("/books", {
        body: disc,
    });

    return response.data;
};


export const addToCart = async (book_id) => {
    const response = await instance.put("/order/item", {
        book_id,
    });
    return response.data;

};

export const getCart = async () => {
    const response = await instance.get("/order");
    return response.data;
};

export const getOrders = async () => {
    const response = await instance.get("/orders");
    return response.data;
};

export const buyOrder = async () => {
    const response = await instance.patch("/order");
    return response.data;
};

export const deleteOrder = async () => {
    const response = await instance.delete("order");
    return response.data;
};