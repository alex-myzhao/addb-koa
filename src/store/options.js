import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export default {
  strict: debug,
  state: {
    options: null
  },
  getters: {
    reporterOptions: state => {
      return state.options.basicDetail.reporterOptions
    },
    diseaseOptions: state => {
      return state.options.basicDetail.diseaseOptions
    },
    countryOptions: state => {
      return state.options.basicDetail.countryOptions
    },
    documentCategoryOptions: state => {
      return state.options.basicDetail.documentCategoryOptions
    },
    grSourceOptions: state => {
      return state.options.locationDetail.grSourceOptions
    },
    informationOptions: state => {
      return state.options.diseaseDetail.informationOptions
    }
  },
  mutations: {
    update: (state, options) => {
      state.options = options
    },
    addOptions: (state, { catagory, optName, payload }) => {
      state.options[catagory][optName].push(payload)
    },
    deleteOptions: (state, { catagory, optName, payload }) => {
      let newOptions = []
      for (let i in state.options[catagory][optName]) {
        if (state.options[catagory][optName][i] !== payload) {
          newOptions.push(state.options[catagory][optName][i])
        }
      }
      state.options[catagory][optName] = newOptions
    }
  },
  actions: {
    updateOpt: ({ commit }) => {
      return axios.post('/option/getWholeOptions', {})
        .then((res) => {
          if (res.data.err === null) {
            commit('update', res.data.data)
            return Promise.resolve()
          } else {
            console.log(res.data.err)
            return Promise.reject(res.data.err)
          }
        })
        .catch((err) => {
          console.log(err)
          return Promise.reject(err)
        })
    }
  }
}
