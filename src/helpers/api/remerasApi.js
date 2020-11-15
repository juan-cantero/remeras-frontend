import Axios from 'axios';

const baseUrl = 'http://192.168.0.104:5000/api';
let headers = {
  'CONTENT-TYPE': 'application/json',
};

const remerasApi = Axios.create({
  baseURL: baseUrl,
  headers,
});

export default remerasApi;
