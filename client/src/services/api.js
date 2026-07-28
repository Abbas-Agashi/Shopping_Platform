import axios from 'axios';

const API_URL = 'https://shopping-platform-wyyh.onrender.com/api';

export const getProducts = (params) => axios.get(`${API_URL}/products`, { params });
export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);
export const addReview = (id, reviewData) => axios.post(`${API_URL}/products/${id}/reviews`, reviewData);
