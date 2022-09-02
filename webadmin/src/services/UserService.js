import axios from 'axios';

import {decode as atob, encode as btoa} from 'base-64';

const API_BASE_URL = "http://localhost:9999/uaa/oauth"

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

        return axios.post(API_BASE_URL + '/token', params, config);
    },

    register(username, email, password) {
        const params = {
            username,
            email,
            password
        }

        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(`${API_BASE_URL}/register`, params, config)
    },


}

export default UserService