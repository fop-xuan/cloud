import { getApi, postApi } from './interface'

const getToken = getApi('/api/qiniu/token')
const qiniuUpData = postApi('https://upload-z2.qiniup.com')
const deleteQiniuData = postApi('/api/qiniu/delete')
const uploadStorageData = postApi('/api/data/upload')
const isUpload = postApi('/api/data/isUpload')
const getFileList = getApi('/api/data/list')
const login = postApi('/api/user/login')
const getUserinfo = getApi('/api/user/getUserInfo')
const logout = getApi('/api/user/logout')
const deleteCloudFile = postApi('/api/data/delete')
export {
    getToken,
    qiniuUpData,
    uploadStorageData,
    isUpload,
    deleteQiniuData,
    getFileList,
    login,
    getUserinfo,
    logout,
    deleteCloudFile
}
