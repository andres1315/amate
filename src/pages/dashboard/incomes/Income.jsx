import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { UserIcon, CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { getIncomes } from './services'
import { Controller, useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { BTable } from '../../../components/Tables/Table.jsx'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Modal } from '../../../components/Modal/Modal'
import { useUser } from '../../../hooks/useUser'
import { SelectTw } from '../../../components/SelectDefault/SelectTw'
import { getCustomers } from '../services/customers'

const Income = () => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const [income, setIncome] = useState([])
  const [customer, setCustomers] = useState([])
  const [modalEditIncomes, setModalEditIncomes] = useState(false)
  const [modalDeleteIncomes, setModalDeleteIncomes] = useState(false)
  const { getToken, dataUser } = useUser()

  useEffect(() => {
    getIncomes({ token: getToken }).then(data => {
      setIncome(data)
    })
    getCustomers({ token: getToken }).then(data => {
      setCustomers(data)
    })
  }, [])

  const onSubmit = data => {
    const dataSubmit = {
      customer: Number(data.customer),
      value: Number(data.value),
      userCreated: dataUser.id,
      description: data.description
    }
    console.log(dataSubmit)
    if (!dataSubmit.customer) return Swal.fire('Atención!', 'Seleccione un cliente', 'error')
    return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/incomes`, dataSubmit,
      {
        headers: { authorization: `Bearer ${getToken}` }
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

  const handleClickEdit = (income) => {
    const idIncome = income
    console.log(idIncome)
    setModalEditIncomes(true)
  }

  const headTableIncomes = ['Cliente', 'Valor', 'Descripcion', 'Fecha', 'Acciones']
  const btnActions = [
    {
      icon: 'edit',
      text: 'Editar',
      color: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
      action: handleClickEdit
    },
    {
      icon: 'delete',
      text: 'Eliminar',
      color: 'bg-red-600 hover:bg-red-700 focus:ring-rose-500',
      action: () => setModalDeleteIncomes(true)
    }
  ]
  const options = customer.map(customer => ({ value: customer.id, label: customer.name }))
  return (
    <>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 md:col-span-2 mx-1 md:border-r-2 md:h-screen px-2 overflow-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2'>
              <SelectTw
                id='customer'
                nameselect='customer'
                label='Cliente'
                control={control}
                customer={options}
              />
              {errors.customer && <p className='text-xs font-medium text-rose-700'>{errors.customer.message}</p>}

            </div>
            <div className='mt-2'>
              <FormIcon
                type='number' label='Valor' placeholder='valor' register={register('value', {
                  required: 'Ingrese valor',
                  min: {
                    value: 1,
                    message: 'El valor debe ser mayor a 1' // JS only: <p>error message</p> TS only support string
                  }
                })}
              >
                <CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </FormIcon>
              {console.log({ errors })}
              {errors.value && <p className='text-xs font-medium text-rose-700'>{errors.value.message}</p>}
            </div>
            <div className='mt-2'>
              <FormIcon
                type='text' label='Tecnica' placeholder='..' register={register('description', {
                  required: 'Ingrese la tecnica'
                })}
              >
                <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </FormIcon>
              {errors.description && <p className='text-xs font-medium text-rose-700'>{errors.description.message}</p>}
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
        <div className='col-span-12 md:col-span-10 md:flex '>
          <div className='mt-2  md:flex-1'>
            <BTable head={headTableIncomes} body={income} actions={btnActions} nameTable='name' />
          </div>
        </div>
      </div>
      {/*   <Modal open={modalEditIncomes} setOpen={setModalEditIncomes} size='xl' title='Editar Ingreso'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 mx-1  px-2 overflow-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-2'>
                <FormIcon type='text' className='block bg-red-50' label='Cliente' placeholder='Nombre del Cliente' register={register('customer', { required: 'Ingrese Nombre del Cliente' })}>
                  <UserIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </FormIcon>
                {errors.customer && <p className='text-xs font-medium text-rose-700'>{errors.customer.message}</p>}
              </div>
              <div className='mt-2'>
                <FormIcon
                  type='number' label='Valor' placeholder='valor' register={register('valuepaid', {
                    required: 'Ingrese valor',
                    min: {
                      value: 1,
                      message: 'El valor debe ser mayor a 1' // JS only: <p>error message</p> TS only support string
                    }
                  })}
                >
                  <CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </FormIcon>
                {errors.valuepaid && <p className='text-xs font-medium text-rose-700'>{errors.valuepaid.message}</p>}
              </div>
              <div className='mt-2'>
                <FormIcon
                  type='text' label='Tecnica' placeholder='..' register={register('description', {
                    required: 'Ingrese la tecnica'
                  })}
                >
                  <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </FormIcon>
                {errors.description && <p className='text-xs font-medium text-rose-700'>{errors.description.message}</p>}
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
        </div>
      </Modal> */}
    </>
  )
}

export {
  Income
}
