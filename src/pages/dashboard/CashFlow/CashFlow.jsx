import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { CardActionDefault } from '../../../components/Cards/CardActionDefault'
import { Modal } from '../../../components/Modal/Modal'
import { useAccountingPeriod } from '../../../hooks/useAccountingPeriod'

export const CashFlow = () => {
  const { getAccountingPeriod, error: errorAccountingPeriod, accountingPeriod, modalAccPeriods, modalCreateAccPeriod } = useAccountingPeriod()

  useEffect(() => {
    getAccountingPeriod()
  }, [])
  console.log(modalAccPeriods)
  if (errorAccountingPeriod) Swal.fire('Atención', errorAccountingPeriod, 'error')
  return (
    <>
      <div className='w-full '>
        <div className='grid grid-cols-3 gap-6 '>
          <div className='col-span-1 md:border-r-2 '>
            <div className='flex justify-center'>
              <div className='w-4/5'>
                <CardActionDefault title='Periodos Contables' txtBtn='Crear' button={{ icon: 'faPlus', text: 'Crear', fn: modalCreateAccPeriod }}>
                  <ul>
                    {
                    accountingPeriod?.map(accPeriod =>
                      <li key={accPeriod.id}>{accPeriod.year}- {accPeriod.month}</li>
                    )
                  }
                  </ul>
                </CardActionDefault>
                <Modal open={modalAccPeriods} title='mueste algo pues' size='lg' setOpen={modalCreateAccPeriod}>
                  <h2>Hello w!</h2>
                </Modal>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
