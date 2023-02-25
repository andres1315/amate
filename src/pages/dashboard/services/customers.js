import axios from 'axios'

export const getCustomers = ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/customers`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    })
    .catch(error => {
      console.log(error)
      throw new Error('Se presento un error al consultar los clientes!')
    })
}
