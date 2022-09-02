import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const RatingService = {

    findAll() {
        console.log('CALL findAll brand');
        return axios.get(ConfigUtil.HOST_URL + '/api/ratings/list')
    },

    findById(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/ratings/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/ratings/save', params, config)
    },
    
}

export default RatingService