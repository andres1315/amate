import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { UserIcon, CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { onSubmit, getIncomes } from './services'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { BTable } from '../../../components/Tables/Table.jsx'

const Income = () => {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm()
  const [income, setIncome] = useState([])

  useEffect(() => {
    getIncomes().then(data => {
      setIncome(data)
    })
  }, [])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      getIncomes().then(data => {
        setIncome(data)
      })
    }
  }, [isSubmitSuccessful])

  const headTableIncomes = ['Cliente', 'Valor', 'Descripcion', 'Fecha']

  return (
    <>
      <div className='grid grid-cols-12 gap-6'>
        <div className='sm:col-span-12 md:col-span-2 mx-1 md:border-r-2 md:h-screen px-2'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-6'>
              <FormIcon type='text' label='Cliente' placeholder='Nombre del Cliente' register={register('customer', { required: 'Ingrese Nombre del Cliente' })}>
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
        <div className='sm:col-span-12 md:col-span-10'>
          <div className='mt-8 hidden sm:block'>
            <div className='inline-block min-w-full border-b border-gray-200 align-middle' />
            <BTable head={headTableIncomes} body={income} />
          </div>
        </div>
      </div>
    </>
  )
}

export {
  Income
}
