import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const ShopService = {

    findAll() {
        const params = {
            firstRecord: 0,
            numberRecords: 12,
            categoryIds: [],
            brandIds: [],
            attributeIds: [],
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.post(ConfigUtil.HOST_URL + '/api/shops/list', params, config)
    },
    
    search(values) {
        const { firstRecord = 0, numberRecords = 12, categoryIds = [], brandsIds = [], attributeIds = [] } = values;
        const params = {
            firstRecord: firstRecord,
            numberRecords: numberRecords,
            categoryIds: categoryIds,
            brandIds: brandsIds,
            attributeIds: attributeIds,
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.post(ConfigUtil.HOST_URL + '/api/shops/list', params, config)
    },
    
    findById(id) {
        const params = {
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.post(ConfigUtil.HOST_URL + `/api/shops/id/${id}`, params, config)
    },

    findByOrder(userid, productid) {
        const params = {
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.post(ConfigUtil.HOST_URL + `/api/shops/order/${userid}/${productid}`, params, config)
    },

    save(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/accounts/save', params, config)
    },

    findByName(name) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.post(ConfigUtil.HOST_URL + '/api/shops/list/' + name, config)
    },

}

export default ShopService;
