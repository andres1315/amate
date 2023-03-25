import { useState } from 'react'
import Swal from 'sweetalert2'
import { createExpenditureServices, getExpenditures } from '../pages/dashboard/Expenditures/services'
import { useUser } from './useUser'

export function useExpenditures ({ reset = null } = {}) {
  const [expenditures, setExpenditures] = useState([])
  const [error, setError] = useState(null)
  const { getToken, dataUser } = useUser()

  const searchAllExpenditures = () => {
    setError(null)
    getExpenditures({ token: getToken })
      .then(expenditures => setExpenditures(expenditures))
      .catch(err => setError(err))
  }

  const createExpenditures = (data) => {
    const dataExpenditure = {
      supplier: 1,
      value: Number(data.value),
      description: data.description,
      userCreated: dataUser.id
    }
    if (!dataExpenditure.supplier) return setError('Debe seleccionar un proveedor')
    createExpenditureServices({ token: getToken, data: dataExpenditure })
      .then(res => {
        if (res.status === 201) {
          Swal.fire(
            'Atención!',
            'Pago registrado con exito!',
            'success'
          )
          reset()
          return searchAllExpenditures()
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return {
    expenditures,
    error,
    searchAllExpenditures,
    createExpenditures
  }
}
