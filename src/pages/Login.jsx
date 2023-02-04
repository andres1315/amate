import { CardLogin } from '../components/CardLogin/CardLogin'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect } from 'react'

export const Login = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const { token } = JSON.parse(window.localStorage.getItem('loggedUser')) || {}
    if (token) navigate('/dashboard')
  }, [])

  const onSubmit = async (data) => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
        username: data.user,
        password: data.password
      })
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data
          window.localStorage.setItem('loggedUser', JSON.stringify({ name: data.name, token: data.token, username: data.username }))
          navigate('/dashboard')
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            title: 'Atención!',
            text: 'Datos Incorrectos',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            title: 'Atención!',
            text: 'Error en el servidor',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
  }
  return (
    <>
      <div className='grid grid-cols-1 content-center   h-screen'>
        <CardLogin register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
    </>
  )
}
