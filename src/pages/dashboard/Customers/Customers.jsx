import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { useForm } from 'react-hook-form'
import { UserCircleIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { TableListRadio } from '../../../components/Tables/TableListRadio.jsx'
import { useEffect } from 'react'
import { useCustomers } from '../../../hooks/useCustomers'
import Swal from 'sweetalert2'

export function Customers () {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { customers, createCustomer, searchAllCustomers, error: errorCustomers } = useCustomers({ reset })

  useEffect(() => {
    searchAllCustomers()
  }, [])

  const headTableIncomes = ['#', 'Cliente', 'Telefono']
  if (errorCustomers) Swal.fire('error', errorCustomers, 'error')
  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 md:col-span-2  mx-1 md:border-r-2 md:h-screen px-2 overflow-auto'>
        <form onSubmit={handleSubmit(createCustomer)}>
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
            {customers.map(item => (
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
                  {item.number}
                </td>
              </tr>
            ))}
          </TableListRadio>
        </div>
      </div>

    </div>
  )
}
