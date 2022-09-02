import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const OrderService = {
    
    findByUser(id) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.get(ConfigUtil.HOST_URL + '/api/orders/users/list/' + id, config)
    },

    updatePayment(id) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.get(ConfigUtil.HOST_URL + '/api/orders/update-payment/' + id, config)
    },

}

export default OrderService;
