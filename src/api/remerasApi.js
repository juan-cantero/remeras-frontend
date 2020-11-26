import axios from 'axios';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from 'axios-extensions';
const REACT_APP_BACKEND_URL = `https://r-emeras.herokuapp.com/api/`;
const REACT_APP_LOCAL_BACKEND_URL = `http://192.168.0.104:5000/api/`;

const baseUrl = REACT_APP_LOCAL_BACKEND_URL;
let headers = {
  'CONTENT-TYPE': 'application/json',
  'Cache-Control': 'no-cache',
};

const remerasApi = axios.create({
  baseURL: baseUrl,
  headers,
});

export const remerasApiCache = axios.create({
  baseURL: baseUrl,
  headers,
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter)
  ),
});

export default remerasApi;
