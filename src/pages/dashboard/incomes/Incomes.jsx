import { FormIcon } from '../../../components/FormIcon/FormIcon'
import { CurrencyDollarIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { SelectTw } from '../../../components/SelectDefault/SelectTw'
import { useIncomes } from '../../../hooks/useIncomes'
import { useCustomers } from '../../../hooks/useCustomers'
import { TableListRadio } from '../../../components/Tables/TableListRadio'
import { formatDate, formatterPeso } from '../../../utils/utils'
import { Modal } from '../../../components/Modal/Modal'

const Incomes = () => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const {
    searchAllIncomes, incomes, createIncome, error: errorIncomes,
    handlerChangeIncomeSelected, handlerClickEdit, modalEditIncome, setModalEditIncome, incomeSelected, handlerUpdateSelectedIncome, updateIncome, handlerClickRemoveIncome
  } = useIncomes({ reset })
  const { searchAllCustomers, error: errorCustomers, customers } = useCustomers()

  if (errorIncomes) Swal.fire('Error', errorIncomes, 'error')
  if (errorCustomers) Swal.fire('Error', errorCustomers, 'error')

  useEffect(() => {
    searchAllIncomes()
    searchAllCustomers()
  }, [])

  const headTableIncomes = ['', 'Cliente', 'Valor', 'Descripcion', 'Fecha']

  const options = customers.map(customer => ({ value: customer.id, label: customer.name }))
  return (
    <>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 md:col-span-2 mx-1 md:border-r-2 md:h-screen px-2 overflow-auto'>
          <h2 className='text-center font-bold text-rose-700'>Ingresos</h2>
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
                className='inline-flex items-center rounded-md border border-transparent  px-2 py-2 text-sm font-medium leading-4 bg-rose-600 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
              >
                Ingresar
              </button>
            </div>
          </form>
          <div className='flex flex-row justify-around mt-5'>
            <button
              className='bg-brown-700 hover:bg-brown-900 focus:ring-rose-500 inline-flex  items-center px-2 py-2 border border-transparent text-xs leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
              onClick={() => handlerClickEdit()}
            >Editar
            </button>
            <button
              className='bg-red-600 hover:bg-red-700 focus:ring-rose-500 inline-flex  items-center px-2 py-2 border border-transparent text-xs leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 '
              onClick={() => handlerClickRemoveIncome()}
            >Eliminar
            </button>
          </div>
        </div>
        <div className='col-span-12 md:col-span-10 md:flex '>
          <div className='mt-2  md:flex-1'>
            <TableListRadio head={headTableIncomes}>
              {incomes.map((income, index) => {
                return (
                  <tr key={income.id} className='text-center font-semibold text-sm'>
                    <td className='px-6 py-1 whitespace-nowrap'>
                      <input
                        name='radioItemTable'
                        type='radio'
                        value={income.id}
                        onChange={() => handlerChangeIncomeSelected(income)}
                        className='h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-500'
                      />
                    </td>
                    <td className='px-6 py-1 whitespace-nowrap '>
                      {income.customer.name}
                    </td>
                    <td className='px-6 py-1 whitespace-nowrap '>
                      {formatterPeso.format(income.value)}
                    </td>
                    <td className='px-6 py-1 whitespace-nowrap '>
                      {income.description || '-'}
                    </td>
                    <td className='px-6 py-1 whitespace-nowrap '>
                      {formatDate(income.createdAt)}
                    </td>
                  </tr>
                )
              })}
            </TableListRadio>
          </div>
        </div>
      </div>
      <Modal open={modalEditIncome} title='Editar Ingreso' size='lg' setOpen={setModalEditIncome}>
        <label className='flex text-sm font-medium text-rose-700'>
          Valor
        </label>
        <div className='relative mt-1 rounded-md shadow-sm'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <input
            type='number'
            value={incomeSelected.value}
            onChange={(e) => handlerUpdateSelectedIncome({ itemUpdate: { value: e.target.value } })}
            className='block w-full rounded-md border-gray-300 pl-10 focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
            placeholder='valor'
          />
        </div>
        <label className='flex text-sm font-medium text-rose-700'>
          Valor
        </label>
        <div className='relative mt-1 rounded-md shadow-sm'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <input
            type='text'
            value={incomeSelected.description}
            onChange={(e) => handlerUpdateSelectedIncome({ itemUpdate: { description: e.target.value } })}
            className='block w-full rounded-md border-gray-300 pl-10 focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
            placeholder='Tecnica'
          />
        </div>
        <div className='w-full mt-2 flex justify-center'>
          <button
            className='flex justify-center rounded-md border border-transparent w-3/5 px-2 py-2 text-sm font-medium leading-4 bg-rose-600 text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
            onClick={() => updateIncome()}
          >Guardar
          </button>

        </div>

      </Modal>

    </>
  )
}

export {
  Incomes
}
