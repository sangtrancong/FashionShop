import axios from 'axios';

import ConfigUtil from '../utils/ConfigUtil'

const CheckoutService = {

    save(params) {
        const config = {
            headers: {
              "content-type": "application/json"
            }
        }

        return axios.post(ConfigUtil.HOST_URL + '/api/checkouts/save', params, config)
    },


}

export default CheckoutService;
