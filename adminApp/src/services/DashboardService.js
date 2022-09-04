import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const DashBoardService = {

    findAll() {
        return axios.get(ConfigUtil.HOST_URL + '/api/dashboards/list')
    },

    report(params) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        return axios.post(ConfigUtil.HOST_URL + '/api/dashboards/report/list', params, config)
    },

}

export default DashBoardService;
