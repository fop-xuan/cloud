import axios from 'axios'

export function postApi(url) {
    return function (param) {
        return axios.post(url, param).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getApi(url) {
    return function (param) {
        return axios.get(url, {
            params: {
                ...param
            }
        }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
    }
}
