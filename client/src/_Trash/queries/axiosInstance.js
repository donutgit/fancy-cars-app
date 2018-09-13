import axios from 'axios';

// const url = process.env.NODE_ENV === "production" ? window.location.origin : "http://localhost:3000"

const instance = axios.create({
  baseURL: window.location.origin
});

export default instance;