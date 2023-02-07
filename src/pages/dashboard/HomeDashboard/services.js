import axios from 'axios'
import { getExpenditures } from '../Expenditures/services'
const { token } = JSON.parse(window.localStorage.getItem('loggedUser')) || {}
const getIncomesMonth = async () => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes/currentMonth`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status === 200) return res.data.data
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al consultar los ingresos!')
    })
}

const getExpendituresCurrentMonth = async () => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/expenditures/currentMonth`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.data.data
      }
    })
    .catch(error => {
      console.log(error)
      throw new Error('Se presento un error al consultar los pagos!')
    })
}

export {
  getExpendituresCurrentMonth,
  getIncomesMonth
}
