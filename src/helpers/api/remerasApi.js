import Axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const token = userInfoFromStorage ? userInfoFromStorage.token : null;
const baseUrl = 'http://192.168.0.104:5000/api';
let headers = {
  'CONTENT-TYPE': 'application/json',
};

if (token) {
  headers.AUTHORIZATION = `Bearer ${token}`;
}

const remerasApi = Axios.create({
  baseURL: baseUrl,
  headers,
});

export default remerasApi;
