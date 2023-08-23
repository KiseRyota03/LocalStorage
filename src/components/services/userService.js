import axios from '~/components/api/axios'

const loginApi = (email,password) => {
    return axios.post('/v1/api/login', {email,password});
}

export {loginApi};