import axios from 'axios'
import Swal from 'sweetalert2'

export const getIncomes = ({ token }) => {
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

export const onSubmit = ({ data, token }) => {
  return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes`, data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 201) {
        Swal.fire(
          'Atención!',
          'Ingreso registrado con exito!',
          'success'
        )
        reset()
        return getIncomes().then(data => setIncome(data))
      }
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.status === 401) {
        return Swal.fire(
          'Atención!',
          err.response.data.message,
          'error'
        )
      } else {
        return Swal.fire(
          'Atención!',
          'Se presento un error al registrar el ingreso!',
          'error'
        )
      }
    })
}
