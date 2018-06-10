import axios from 'axios'

export default {
  bugReport (description) {
    return axios.post('/report/bug', {
      description: description
    })
  },
  newUserReport (username) {
    return axios.post('/report/newuser', {
      username: username
    })
  }
}
