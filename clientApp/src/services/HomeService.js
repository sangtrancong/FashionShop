import axios from 'axios'

import ConfigUtil from '../utils/ConfigUtil'

const HomeService = {

    findAll() {
        return axios.get(ConfigUtil.HOST_URL + '/api/homes/list')
    },

}

export default HomeService;
