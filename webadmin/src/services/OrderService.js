import axios from 'axios';

import ConfigUtil from '../utils/ConfigUtil';

const OrderService = {

    findAll() {
        return axios.get(ConfigUtil.HOST_URL + '/api/orders/list');
    },

    findByProgress(progress) {
        return axios.get(ConfigUtil.HOST_URL + '/api/orders/progress/' + progress);
    },

    findyId(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/orders/id/${id}`)
    },

    findByOrder(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/orders/details/${id}`)
    },

    findByDelivery(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/orders/delivery/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/orders/save', params, config)
    },
    
}

export default OrderService;
