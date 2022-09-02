import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const AccountService = {

    findAll() {
        console.log('CALL findAll');
        return axios.get(ConfigUtil.HOST_URL + '/api/accounts/list')
    },

    findAllByShipper() {
        console.log('CALL findAllByShipper');
        return axios.get(ConfigUtil.HOST_URL + '/api/accounts/shipper/list')
    },
    
    findyId(id) {
        return axios.get(ConfigUtil.HOST_URL + `/api/accounts/id/${id}`)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/accounts/save', params, config)
    },

}

export default AccountService;
