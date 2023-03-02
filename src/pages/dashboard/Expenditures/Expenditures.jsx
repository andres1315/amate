import { useForm } from 'react-hook-form'
import { getExpenditures } from './services'
import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { UserIcon, CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { useUser } from '../../../hooks/useUser'
import Swal from 'sweetalert2'
import axios from 'axios'
import { TableListRadio } from '../../../components/Tables/TableListRadio'
import { formatDate, formatterPeso } from '../../../utils/utils'
import { SelectTw } from '../../../components/SelectDefault/SelectTw'
import { getSuppliers } from '../Suppliers/services'

const headTable = ['#', 'Proveedor', 'Valor', 'Concepto', 'Fecha']
export const Expenditures = () => {
  const [expenditures, setExpenditures] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const { getToken, dataUser } = useUser()

  useEffect(() => {
    getExpenditures({ token: getToken }).then(data => {
      setExpenditures(data)
    })
    getSuppliers({ token: getToken }).then(data => {
      setSuppliers(data)
    })
  }, [])

  const onSubmit = async (data) => {
    const dataExpenditure = {
      supplier: 1,
      value: Number(data.value),
      description: data.description,
      userCreated: dataUser.id
    }
    axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/expenditures`, dataExpenditure,
      {
        headers: { authorization: `Bearer ${getToken}` }
      })
      .then(res => {
        if (res.status === 201) {
          getExpenditures({ token: getToken }).then(data => {
            setExpenditures(data)
          })
          reset()
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
              <SelectTw
                id='supplier'
                nameselect='supplier'
                txtrequired='Seleccione un proveedor'
                label='Cliente'
                control={control}
                options={suppliers.map(supplier => ({ value: supplier.id, label: supplier.name }))}
              />
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
            <TableListRadio head={headTable}>
              {expenditures.map((expenditure, index) => (
                <tr key={index} className='text-center font-semibold text-sm'>
                  <td className='px-6 py-1 whitespace-nowrap'>
                    <input
                      id='push-everything'
                      name='push-notifications'
                      type='radio'
                      value={expenditure.id}
                      className='h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-500'
                    />
                  </td>
                  <td className='px-6 py-1 whitespace-nowrap '>
                    {expenditure.supplier.name}
                  </td>
                  <td className='px-6 py-1 whitespace-nowrap'>
                    {formatterPeso.format(expenditure.value)}
                  </td>
                  <td className='px-6 py-1 whitespace-nowrap capitalize  '>
                    {expenditure.description}
                  </td>
                  <td className='px-6 py-1 whitespace-nowrap'>
                    {formatDate(expenditure.createdAt)}
                  </td>
                </tr>
              ))}

            </TableListRadio>
          </div>
        </div>
      </div>
    </>
  )
}
