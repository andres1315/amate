import axios from 'axios'

export const getAccountingPeriodService = ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/accounting-periods`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log({ res })
      return res.data
    })
    .catch(err => {
      console.log(err)
      throw new Error('Error al  obtener los periods contables')
    })
}
