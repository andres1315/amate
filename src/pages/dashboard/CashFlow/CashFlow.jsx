import Swal from 'sweetalert2'
import { CardActionDefault } from '../../../components/Cards/CardActionDefault'
import { useAccountingPeriod } from '../../../hooks/useAccountingPeriod'

export const CashFlow = () => {
  const { error: errorAccountingPeriod, accountingPeriod, createAccountingPeriod, handlerOpenClosePeriod } = useAccountingPeriod()

  if (errorAccountingPeriod) Swal.fire('Atención', errorAccountingPeriod, 'error')
  return (
    <>
      <div className='w-full '>
        <div className='grid grid-cols-3 gap-6 '>
          <div className='col-span-1 md:border-r-2 '>
            <div className='flex justify-center'>
              <div className='w-4/5'>
                <CardActionDefault title='Periodos Contables' txtBtn='Crear' button={{ icon: 'faPlus', text: 'Crear', fn: createAccountingPeriod }}>
                  <ul className='flex flex-col gap-2'>
                    {
                    accountingPeriod?.map(accPeriod =>
                      <li className='flex justify-around' key={accPeriod.id}>
                        <span>{accPeriod.year}- {accPeriod.month}</span>
                        <button
                          className={`px-2 rounded-xl text-white ${accPeriod.open ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                          onClick={() => handlerOpenClosePeriod({ id: accPeriod.id, open: accPeriod.open })}
                        >{accPeriod.open ? 'Abierto' : 'Cerrado'}
                        </button>
                      </li>
                    )
                  }
                  </ul>
                </CardActionDefault>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
