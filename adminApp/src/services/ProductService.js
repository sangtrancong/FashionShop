import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const ProductService = {

    findAll() {
        return axios.get(ConfigUtil.HOST_URL + '/api/products/list')
    },

    findFormById(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/products/form/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/products/save', params, config)
    },
    
}

export default ProductService