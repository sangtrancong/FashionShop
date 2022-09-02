import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const CommentService = {

    findAll() {
        console.log('CALL findAll brand');
        return axios.get(ConfigUtil.HOST_URL + '/api/comments/list')
    },

    findById(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/comments/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/comments/save', params, config)
    },
    
}

export default CommentService