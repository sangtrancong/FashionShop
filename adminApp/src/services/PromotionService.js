import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const PromotionService = {

    findAll() {
        console.log('CALL findAll brand');
        return axios.get(ConfigUtil.HOST_URL + '/api/promotions/list')
    },

    findById(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/promotions/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/promotions/save', params, config)
    },
    
}

export default PromotionService