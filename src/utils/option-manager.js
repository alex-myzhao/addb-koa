import axios from 'axios'

export default {
  //  these 3 apis will be deprecated
  getReportOptions () {
    return axios.post('/option/getReporter', {})
  },
  addReporter (newReporter) {
    return axios.post('/option/addReporter', {
      newReporter: newReporter
    })
  },
  deleteReporter (reporter) {
    return axios.post('/option/deleteReporter', {
      reporter: reporter
    })
  },
  //  --------------------------------

  getOptions (catagory, optName) {
    return axios.post('/option/getOptions', {})
  },
  addOptions (catagory, optName, payload) {
    return axios.post('/option/addOptions', { catagory, optName, payload })
  },
  deleteOptions (catagory, optName, payload) {
    return axios.post('/option/deleteOptions', { catagory, optName, payload })
  }
}
