import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { useForm } from 'react-hook-form'
import { UserCircleIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { TableListRadio } from '../../../components/Tables/TableListRadio.jsx'
import { useUser } from '../../../hooks/useUser'
import { useEffect, useState } from 'react'
import { getCustomer } from './services'
import axios from 'axios'
import Swal from 'sweetalert2'

export function Customers () {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [customer, setCustomer] = useState([])
  const { getToken } = useUser()

  const onSubmit = (data) => {
    const dataSubmit = {
      name: data.name,
      number: Number(data.number)
    }
    return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/customers`, dataSubmit,
      {
        headers: { authorization: `Bearer ${getToken}` }
      })
      .then(res => {
        console.log({ res })
        if (res.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Cliente registrado con exito!',
            showConfirmButton: false,
            timer: 1500
          })
          reset()
          return getCustomer({ token: getToken }).then(data => {
            const dataCustomer = data.map((item, index) => ({ id: item.id, name: item.name, phone: item.number }))
            setCustomer(dataCustomer)
          })
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          return Swal.fire(
            'Atención!',
            err.response.data.message,
            'error'
          )
        }
      })
  }

  useEffect(() => {
    getCustomer({ token: getToken }).then(data => {
      const dataCustomer = data.map((item, index) => ({ id: item.id, name: item.name, phone: item.number }))
      setCustomer(dataCustomer)
      console.log(dataCustomer)
    })
  }, [])

  const headTableIncomes = ['#', 'Cliente', 'Telefono']

  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 md:col-span-2  mx-1 md:border-r-2 md:h-screen px-2 overflow-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-2'>
            <FormIcon
              type='text' label='Cliente' register={register('name', {
                required: 'Ingrese Nombre del cliente'
              })}
            >
              <UserCircleIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </FormIcon>
            {errors.name && <p className='text-xs font-medium text-rose-700'>{errors.name.message}</p>}
          </div>
          <div className='mt-2'>
            <FormIcon
              type='number' label='Telefono' placeholder='..' register={register('number', {
                required: 'Ingrese telefono del cliente',
                min: {
                  value: 1,
                  message: 'El telefono debe ser mayor a 1'
                }
              })}
            >
              <PhoneIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </FormIcon>
            {errors.number && <p className='text-xs font-medium text-rose-700'>{errors.number.message}</p>}
          </div>
          <div className='mt-2'>
            <button className='w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500' type='submit'>
              Crear Cliente
            </button>
          </div>
        </form>
      </div>

      <div className='col-span-12 md:col-span-10  md:flex'>
        <div className='mt-2  md:flex-1'>
          <TableListRadio head={headTableIncomes}>
            {customer.map(item => (
              <tr key={item.id} className='text-center font-semibold text-sm'>
                <td className='px-6 py-1 whitespace-nowrap'>
                  <input
                    id='push-everything'
                    name='push-notifications'
                    type='radio'
                    value={item.id}
                    className='h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-500'
                  />
                </td>
                <td className='px-6 py-1 whitespace-nowrap capitalize '>
                  {item.name}
                </td>
                <td className='px-6 py-1 whitespace-nowrap'>
                  {item.phone}
                </td>
              </tr>
            ))}
          </TableListRadio>
        </div>
      </div>

    </div>
  )
}
