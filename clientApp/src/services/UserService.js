import axios from 'axios';

import {decode as atob, encode as btoa} from 'base-64';

const API_BASE_URL = "http://localhost:9999/uaa"

const AUTHEN_USERNAME = "webapp";
const AUTHEN_PASSWORD = "password";

const UserService = {

    login(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');

        const basicAuth = 'Basic ' + btoa(AUTHEN_USERNAME + ':' + AUTHEN_PASSWORD);

        const config = {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              'Authorization': basicAuth,
            },
        }

        return axios.post(API_BASE_URL + '/oauth/token', params, config);
    },

    register(fullname, email, password) {
        const params = {
            fullname,
            email,
            password
        }

        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(`${API_BASE_URL}/auth/register`, params, config)
    },

    updateProfile(params) {
        console.log('params', params)
        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(`${API_BASE_URL}/auth/profile`, params, config)
    },

    changepass(params) {
        console.log('params', params)
        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(`${API_BASE_URL}/auth/changepass`, params, config)
    },

    google(fullname, email) {
        const params = {
            fullname,
            email,
        }

        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(`${API_BASE_URL}/auth/google`, params, config)
    },

    forgotpass(params) {
        console.log('params', params)
        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(`${API_BASE_URL}/auth/forgotpass`, params, config)
    },

}

export default UserService;
