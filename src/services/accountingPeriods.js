import axios from 'axios'

const createAccountingPeriodService = async ({ token }) => {
  return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/accounting-periods/create`, {},
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al crear el periodo contable!')
    })
}

const openClosePeriodService = async ({ token, id, open }) => {
  return axios.patch(`${import.meta.env.VITE_REACT_APP_API_URL}/accounting-periods/open-close/${id}`, { open },
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al actualizar el periodo contable!')
    })
}

export {
  createAccountingPeriodService,
  openClosePeriodService
}
