import axios from 'axios'

const getIncomesMonth = async ({ token }) => {
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

function getExpendituresCurrentMonth ({ token }) {
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
