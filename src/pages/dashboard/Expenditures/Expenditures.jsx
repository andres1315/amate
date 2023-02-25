import { useForm } from 'react-hook-form'
import { getExpenditures } from './services'
import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { UserIcon, CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { BTable } from '../../../components/Tables/Table'
import { useState, useEffect } from 'react'
import { useUser } from '../../../hooks/useUser'
import Swal from 'sweetalert2'
import axios from 'axios'

const headTable = ['Proveedor', 'Valor', 'Concepto', 'Fecha']
export const Expenditures = () => {
  const [expenditures, setExpenditures] = useState([])
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { getToken } = useUser()
  useEffect(() => {
    getExpenditures({ token: getToken }).then(data => {
      setExpenditures(data)
    })
  }, [])

  const onSubmit = async (data) => {
    const { getToken } = useUser()
    axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/expenditures`, data,
      {
        headers: { authorization: `Bearer ${getToken}` }
      })
      .then(res => {
        if (res.status === 201) {
          getExpenditures({ token: getToken }).then(data => {
            setExpenditures(data)
          })
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
  return (
    <>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 md:col-span-2 mx-1 md:border-r-2 md:h-screen px-2 overflow-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-6'>
              <FormIcon type='text' label='Descripcion' placeholder='...' register={register('description', { required: 'Ingrese una descripcion' })}>
                <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </FormIcon>
              {errors.description && <p className='text-xs font-medium text-rose-700'>{errors.description.message}</p>}
            </div>
            <div className='mt-2'>
              <FormIcon
                type='number' label='Valor' placeholder='valor' register={register('value', {
                  required: 'Ingrese el valor',
                  min: {
                    value: 1,
                    message: 'El valor debe ser mayor a 1' // JS only: <p>error message</p> TS only support string
                  }
                })}
              >
                <CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </FormIcon>
              {errors.value && <p className='text-xs font-medium text-rose-700'>{errors.value.message}</p>}
            </div>
            <div className='mt-2'>
              <FormIcon
                type='text' label='Proveedor' placeholder='..' register={register('supplier', {
                  required: 'Ingrese el proveedor'
                })}
              >
                <UserIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </FormIcon>
              {errors.supplier && <p className='text-xs font-medium text-rose-700'>{errors.supplier.message}</p>}
            </div>
            <div className='mt-2 flex justify-center'>
              <button
                type='submit'
                className='inline-flex items-center rounded-md border border-transparent  px-3 py-2 text-sm font-medium leading-4 bg-rose-600 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
        <div className='col-span-12 md:col-span-10 md:flex'>
          <div className='mt-8 md:flex-1'>
            <div className='inline-block min-w-full border-b border-gray-200 align-middle' />
            <BTable head={headTable} body={expenditures} nameTable='supplier' />
          </div>
        </div>
      </div>
    </>
  )
}
