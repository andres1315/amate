import { CardLogin } from '../components/CardLogin/CardLogin'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export const Login = () => {
  const { register, handleSubmit} = useForm()
  const navigate=useNavigate()
  
  const onSubmit = data => {
    if(data.user==='amate' && data.password==='Adminamate'){
      console.log(data)
      localStorage.setItem('loggedUser', JSON.stringify({...data,name:'Admin Amate'}))
      navigate('/dashboard')
    }else{
      Swal.fire({
        title: 'Atención!',
        text: 'Datos Incorrectos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 content-center   h-screen">
        <CardLogin register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
    </>
  )
}
