import { CardLogin } from '../components/CardLogin/CardLogin'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
export const Login = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { login, isLogged } = useUser()

  useEffect(() => {
    if (isLogged) navigate('/dashboard')
  }, [isLogged])

  const onSubmit = async (data) => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
        username: data.user,
        password: data.password
      })
      .then((res) => {
        if (res.status === 200) {
          const { data: user } = res.data

          login({ user })
          navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err)
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
