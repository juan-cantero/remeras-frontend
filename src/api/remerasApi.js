import Axios from 'axios';

const REACT_APP_BACKEND_URL = `https://r-emeras.herokuapp.com/api/`;
const REACT_APP_LOCAL_BACKEND_URL = `http://localhost:5000/api/`;

const baseUrl = REACT_APP_LOCAL_BACKEND_URL;
let headers = {
  'CONTENT-TYPE': 'application/json',
};

const remerasApi = Axios.create({
  baseURL: baseUrl,
  headers,
});

export default remerasApi;
