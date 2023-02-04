import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar, faDollarSign, faMoneyBillTrendUp, faSackXmark } from '@fortawesome/free-solid-svg-icons'
import { formatterPeso } from '../../../utils/utils'
import { getAllIncomes } from './services'
import { useEffect, useState } from 'react'

const initialValueCards = [
  { name: 'Ingresos', icon: <FontAwesomeIcon icon={faMoneyBillTrendUp} />, value: 16, bgColor: 'bg-green-400 text-xl' },
  { name: 'Egresos', icon: <FontAwesomeIcon icon={faSackXmark} />, value: 16, bgColor: 'bg-red-600 text-xl' },
  { name: 'Saldo pendiente', icon: <FontAwesomeIcon icon={faDollarSign} />, value: 8, bgColor: 'bg-purple-600 text-xl' },
  { name: 'Caja', icon: <FontAwesomeIcon icon={faSackDollar} />, value: 12, bgColor: 'bg-rose-600 text-xl' }
]

export const HomeDashboard = () => {
  const [incomes, setIcomes] = useState(0)
  const [expenditures, setExpenditures] = useState(0)
  const [dataCards, setDataCards] = useState(initialValueCards)
  useEffect(() => {
    getAllIncomes().then((res) => setIcomes(res.reduce((sum, obj) => sum + obj.value, 0)))
  }, [])

  useEffect(() => {
    const newDataCards = [...dataCards]
    newDataCards.find((item) => item.name === 'Ingresos').value = incomes
    setDataCards(newDataCards)
  }, [incomes, expenditures])
  return (
    <>

      <div className='mx-8'>
        <ul role='list' className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
          {dataCards.map((project) => (
            <li key={project.name} className='col-span-1 flex rounded-md shadow-sm'>
              <div
                className={`${project.bgColor} flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md`}
              >
                {project.icon}
              </div>
              <div className='flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white'>
                <div className='flex-1 truncate px-4 py-2 text-sm'>
                  <a href={project.href} className='font-medium text-gray-900 hover:text-gray-600'>
                    {project.name}
                  </a>
                  <p className='text-gray-500'>{formatterPeso.format(project.value)} </p>
                </div>
                <div className='flex-shrink-0 pr-2'>
                  <button
                    type='button'
                    className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
