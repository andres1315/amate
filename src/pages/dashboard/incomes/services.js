import axios from 'axios'
import Swal from 'sweetalert2'

const getIncomes = ({ token, month, year }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes/year/${year}/month/${month}`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) {
        return res.data.data.map(income => (
          {
            createdAt: income.createdAt,
            customer: {
              id: income.customer.id,
              name: income.customerDetail.name
            },
            description: income.description,
            value: income.value,
            id: income.id
          }
        )) || []
      }
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

const getAllIncomes = ({ token, month, year }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 200) {
        return res.data.data.map(income => (
          {
            createdAt: income.createdAt,
            customer: {
              id: income.customer.id,
              name: income.customerDetail.name
            },
            description: income.description,
            value: income.value,
            id: income.id
          }
        )) || []
      }
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
      if (res.status === 200) return res.data.data
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al consultar los ingresos!')
    })
}

const createIncomeService = ({ token, data }) => {
  return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes`, data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err.response.data.message)
      throw new Error(err.response.data.message)
    })
}

const removeIncomeService = ({ token, id }) => {
  return axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes/${id}`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al eliminar el ingreso!')
    })
}

const updateIncomeService = ({ token, id, data }) => {
  return axios.patch(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes/${id}`, data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al actualizar el ingreso!')
    })
}

export {
  getIncomes,
  getAllIncomes,
  getIncomesMonth,
  createIncomeService,
  removeIncomeService,
  updateIncomeService
}
