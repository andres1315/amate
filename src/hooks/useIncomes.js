import { useState } from 'react'
import { createIncomeService, getIncomes } from '../pages/dashboard/Incomes/services'
import { useUser } from './useUser'
import Swal from 'sweetalert2'
export function useIncomes ({ reset }) {
  const [incomes, setIncomes] = useState([])
  const { getToken, dataUser } = useUser()
  const [error, setError] = useState(null)

  const searchAllIncomes = () => {
    setError(null)
    getIncomes({ token: getToken })
      .then(incomes => setIncomes(incomes))
      .catch(err => setError(err))
  }

  const createIncome = (data) => {
    setError(null)
    const dataSubmit = {
      customer: Number(data.customer),
      value: Number(data.value),
      userCreated: dataUser.id,
      description: data.description
    }
    if (!dataSubmit.customer) return setError('Debe seleccionar un cliente')
    createIncomeService({ token: getToken, data: dataSubmit })
      .then(res => {
        if (res.status === 201) {
          Swal.fire(
            'Atención!',
            'Ingreso registrado con exito!',
            'success'
          )
          reset()
          return searchAllIncomes()
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          setError(err.response.data.message)
        } else {
          setError('Se presento un error al registrar el ingreso!')
        }
      })
  }

  return {
    searchAllIncomes,
    incomes,
    createIncome,
    error
  }
}
