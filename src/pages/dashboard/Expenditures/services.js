import axios from 'axios'

const getExpenditures = async ({ token }) => {
  return await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/expenditures`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data.data
      }
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al consultar los pagos!')
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
function createExpenditureServices ({ token, data }) {
  return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/expenditures`, data, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      throw new Error('Se presento un error al registrar el pago!')
    })
}
export {

  getExpenditures,
  getExpendituresCurrentMonth,
  createExpenditureServices
}
