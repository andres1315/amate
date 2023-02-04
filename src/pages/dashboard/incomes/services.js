import axios from 'axios'
import Swal from 'sweetalert2'
const onSubmit = data => {
  const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
  axios.post('http://localhost:3010/api/incomes', data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 201) {
        return Swal.fire(
          'Atención!',
          'Ingreso registrado con éxito!',
          'success'
        )
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

const getIncomes = () => {
  const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
  return axios.get('http://localhost:3010/api/incomes',
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

export {
  onSubmit,
  getIncomes
}
