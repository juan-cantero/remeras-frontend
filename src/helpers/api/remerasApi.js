import Axios from 'axios';

const baseUrl = 'https://r-emeras.herokuapp.com/api';
let headers = {
  'CONTENT-TYPE': 'application/json',
};

const remerasApi = Axios.create({
  baseURL: baseUrl,
  headers,
});

export default remerasApi;
