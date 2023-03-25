import { useState } from 'react'
import Swal from 'sweetalert2'
import { createSupplierService, getSuppliers } from '../pages/dashboard/Suppliers/services'
import { useUser } from './useUser'

export function useSuppliers ({ reset = null } = {}) {
  const [suppliers, setSuppliers] = useState([])
  const [error, setError] = useState(null)
  const { getToken } = useUser()

  const searchAllSuppliers = () => {
    setError(null)
    getSuppliers({ token: getToken })
      .then(suppliers => setSuppliers(suppliers))
      .catch(err => setError(err))
  }

  const createSupplier = data => {
    setError(null)
    if (!data.name) return setError('Debe ingresar el nombre del proveedor')
    createSupplierService({ token: getToken, data })
      .then(res => {
        console.log('entro por aca 1')
        if (res.status === 201) {
          Swal.fire(
            'Atención!',
            'Proveedor registrado con exito!',
            'success'
          )
          reset()
          return searchAllSuppliers()
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          setError(err.response.data.message)
        } else {
          setError('Se presento un error al registrar el proveedor!')
        }
      })
  }

  return {
    suppliers,
    error,
    searchAllSuppliers,
    createSupplier
  }
}
