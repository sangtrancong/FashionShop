import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const BrandService = {

    findAll() {
        console.log('CALL findAll brand');
        return axios.get(ConfigUtil.HOST_URL + '/api/brands/list')
    },

    findById(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/brands/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/brands/save', params, config)
    },
    
}

export default BrandService