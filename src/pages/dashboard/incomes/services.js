import axios from 'axios'
import Swal from 'sweetalert2'
import { CloseSession } from '../../../utils/utils'
const { token } = JSON.parse(window.localStorage.getItem('loggedUser')) || {}

const getIncomes = () => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) return res.data.data
    })
    .catch(err => {
      if (err.response.status === 401) return CloseSession()
      return Swal.fire(
        'Atención!',
        'Se presento un error al consultar los ingresos!',
        'error'
      )
    })
}

export {
  getIncomes
}
