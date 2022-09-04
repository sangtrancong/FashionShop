import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const CategoryService = {

    findAll() {
        console.log('CALL findAll');
        return axios.get(ConfigUtil.HOST_URL + '/api/categorys/list')
    },
    
    findyId(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/categorys/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/categorys/save', params, config)
    },

}

export default CategoryService;
