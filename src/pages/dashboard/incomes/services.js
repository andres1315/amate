import axios from 'axios'
import Swal from 'sweetalert2'

const getIncomes = ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) return res.data.data
    })
    .catch(err => {
      console.log(err)
      return Swal.fire(
        'Atención!',
        'Se presento un error al consultar los ingresos!',
        'error'
      )
    })
}

const getIncomesMonth = async ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes/currentMonth`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status === 200) return res.data
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al consultar los ingresos!')
    })
}

export {
  getIncomes,
  getIncomesMonth
}
