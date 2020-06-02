import axios from 'axios'
import errors from './error'
import { Loading } from 'quasar'

const loadFunction = config => {
  Loading.show()
  return config
}

const finishFunction = response => {
  Loading.hide()
  return response
}

const errorFunction = error => {
  Loading.hide()
  errors(error)
  return Promise.reject(error)
}

const axiosInstance = axios.create({
  baseURL: 'https://riesgos-back.herokuapp.com/'
})

axiosInstance.interceptors.request.use(loadFunction)

axiosInstance.interceptors.response.use(finishFunction, errorFunction)

export default axiosInstance
