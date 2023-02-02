import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { UserIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid'
import { onSubmit, getIncomes } from './services'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

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
            <div className='inline-block min-w-full border-b border-gray-200 align-middle'>
              <table className='min-w-full'>
                <thead>
                  <tr className='border-t border-gray-200'>
                    <th
                      className='border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900'
                      scope='col'
                    >
                      <span className='lg:pl-2'>Project</span>
                    </th>
                    <th
                      className='border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900'
                      scope='col'
                    >
                      Members
                    </th>
                    <th
                      className='hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 md:table-cell'
                      scope='col'
                    >
                      Last updated
                    </th>
                    <th
                      className='border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900'
                      scope='col'
                    />
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 bg-white'>
                  {income?.length && income.map((project) => (
                    <tr key={project.id}>
                      <td className='w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900'>
                        <div className='flex items-center space-x-3 lg:pl-2'>
                          <div
                            className=''
                            aria-hidden='true'
                          />
                          <a href='#' className='truncate hover:text-gray-600'>
                            <span>
                              {project.name} <span className='font-normal text-gray-500'>in {project.name}</span>
                            </span>
                          </a>
                        </div>
                      </td>
                      <td className='px-6 py-3 text-sm font-medium text-gray-500'>
                        <div className='flex items-center space-x-2'>
                          <div className='flex flex-shrink-0 -space-x-1' />

                        </div>
                      </td>

                      <td className='whitespace-nowrap px-6 py-3 text-right text-sm font-medium'>
                        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {
  Income
}
