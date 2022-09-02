import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const ProfileService = {
    
    findByUser(id) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.get(ConfigUtil.HOST_URL + '/api/accounts/id/' + id, config)
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

export default ProfileService;
