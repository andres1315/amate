import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { UserIcon, CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { BTable } from '../../../components/Tables/Table.jsx'
import Swal from 'sweetalert2'
import { Modal } from '../../../components/Modal/Modal'
import { SelectTw } from '../../../components/SelectDefault/SelectTw'
import { useIncomes } from '../../../hooks/useIncomes'
import { useCustomers } from '../../../hooks/useCustomers'

const Incomes = () => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const [modalEditIncomes, setModalEditIncomes] = useState(false)
  const [modalDeleteIncomes, setModalDeleteIncomes] = useState(false)
  const { searchAllIncomes, incomes, createIncome, error: errorIncomes } = useIncomes({ reset })
  const { searchAllCustomers, error: errorCustomers, customers } = useCustomers()

  if (errorIncomes) Swal.fire('Error', errorIncomes, 'error')
  if (errorCustomers) Swal.fire('Error', errorCustomers, 'error')
  useEffect(() => {
    searchAllIncomes()
    searchAllCustomers()
  }, [])

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
  const options = customers.map(customer => ({ value: customer.id, label: customer.name }))
  return (
    <>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 md:col-span-2 mx-1 md:border-r-2 md:h-screen px-2 overflow-auto'>
          <form onSubmit={handleSubmit(createIncome)}>
            <div className='mt-2'>
              <SelectTw
                id='customer'
                nameselect='customer'
                label='Cliente'
                control={control}
                options={options}
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
            <BTable head={headTableIncomes} body={incomes} actions={btnActions} nameTable='name' />
          </div>
        </div>
      </div>
      {/* <Modal open={modalEditIncomes} setOpen={setModalEditIncomes} size='xl' title='Editar Ingreso'>
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
  Incomes
}
