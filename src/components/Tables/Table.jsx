import { formatDate, formatterPeso } from '../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const iconsButtons = {
  edit: faPenToSquare,
  delete: faTrashAlt
}
export const BTable = ({ head, body, nameTable = '', actions = [] } = {}) => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='overflow-y-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200 table-auto'>
                <thead className='bg-gray-50'>
                  <tr>
                    {head.map((item) => (
                      <th
                        key={item}
                        className='border-b border-gray-200 bg-gray-50 px-6 py-3  text-sm font-semibold text-gray-900'
                        scope='col'
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 bg-white'>
                  {body.map((item) => (
                    <tr key={item.id} className='text-center font-semibold text-sm'>
                      <td>{item.customer.name}</td>
                      <td>{formatterPeso.format(item.value)}</td>
                      <td>{item.description || '-'}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      {actions.length > 0 && (
                        <>
                          <td className='flex justify-center gap-2'>
                            {actions.map((action) => {
                              return (
                                <div key={action.text}>
                                  <button
                                    type='button'
                                    onClick={() => action.action(item)}
                                    className={`inline-flex  items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white ${action.color} focus:outline-none focus:ring-2 focus:ring-offset-2 `}
                                  >
                                    <FontAwesomeIcon icon={iconsButtons[action.icon]} className='mr-1' />

                                    {action.text}
                                  </button>
                                </div>
                              )
                            })}
                          </td>
                        </>
                      )}
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
