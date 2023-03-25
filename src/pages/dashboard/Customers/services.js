import axios from 'axios'

export const getCustomer = ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/customers`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) return res.data.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const createCustomerService = ({ token, data }) => {
  return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/customers`, data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log({ res })
      return res
    })
    .catch(err => {
      console.log(err)
      throw new Error('Error al crear el cliente')
    })
}
