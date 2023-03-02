import axios from 'axios'

export const getCustomer = ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/customers`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
