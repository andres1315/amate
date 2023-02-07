import axios from 'axios'
import Swal from 'sweetalert2'
const { token } = JSON.parse(window.localStorage.getItem('loggedUser')) || {}
const onSubmit = (data) => {
  axios.post('http://localhost:3010/api/expenditures', data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 201) {
        return Swal.fire(
          'Atención!',
          'Pago registrado con éxito!',
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
          'Se presento un error al registrar el Pago!',
          'error'
        )
      }
    })
}

const getExpenditures = () => {
  return axios.get('http://localhost:3010/api/expenditures', {
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
export {
  onSubmit,
  getExpenditures
}
