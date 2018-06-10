import axios from 'axios'
import md5 from 'md5'

export default {
  searchAllUser () {
    return axios.post('/manage/searchAllUser', {})
  },
  searchUser (username) {
    return axios.post('/manage/searchUser', {
      username
    })
  },
  addUser (username, password, authority, managerInfo) {
    return axios.post('/manage/addUser', {
      username, password: md5(password), authority, managerInfo
    })
  },
  deleteUser (username, managerInfo) {
    return axios.post('/manage/deleteUser', {
      username, managerInfo
    })
  },
  modifyPassword (username, newPassword, managerInfo) {
    return axios.post('/manage/modifyPassword', {
      username, newPassword: md5(newPassword), managerInfo
    })
  },
  modifyAuthority (username, newAuthority, managerInfo) {
    return axios.post('/manage/modifyAuthority', {
      username, newAuthority, managerInfo
    })
  }
}
