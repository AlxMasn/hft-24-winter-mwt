import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5199/api', // Replace with your server URL
});

export const getAllItems = () => API.get('/shoppingItems');
export const getItemByName = (name) => API.get(`/shoppingItems/${name}`);
export const addItem = (item) => API.post('/shoppingItems', item);
export const updateItem = (name, updatedItem) => API.put(`/shoppingItems/${name}`, updatedItem);
export const deleteItem = (name) => API.delete(`/shoppingItems/${name}`);