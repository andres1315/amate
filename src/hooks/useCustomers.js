import { useState } from 'react'
import { useUser } from './useUser'
import { createCustomerService, getCustomer } from '../pages/dashboard/Customers/services'
import Swal from 'sweetalert2'

export function useCustomers ({ reset = null } = {}) {
  const [customers, setCustomers] = useState([])
  const { getToken } = useUser()
  const [error, setError] = useState(null)

  const searchAllCustomers = () => {
    setError(null)
    getCustomer({ token: getToken })
      .then(customers => setCustomers(customers))
      .catch(err => setError(err))
  }

  const createCustomer = data => {
    setError(null)
    const dataSubmit = {
      name: data.name,
      number: Number(data.number)
    }
    createCustomerService({ token: getToken, data: dataSubmit })
      .then(res => {
        if (res.status === 201) {
          Swal.fire(
            'Atención!',
            'Pago registrado con exito!',
            'success'
          )
          reset()
          return searchAllCustomers()
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return {
    customers,
    searchAllCustomers,
    error,
    createCustomer
  }
}
