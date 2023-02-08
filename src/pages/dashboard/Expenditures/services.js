import axios from 'axios'
import Swal from 'sweetalert2'
const { token } = JSON.parse(window.localStorage.getItem('loggedUser')) || {}
const onSubmit = async (data) => {
  axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/expenditures`, data,
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

const getExpenditures = async () => {
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
export {
  onSubmit,
  getExpenditures
}
