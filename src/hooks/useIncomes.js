import { useState } from 'react'
import { createIncomeService, getIncomes, removeIncomeService, updateIncomeService } from '../pages/dashboard/Incomes/services'
import { useUser } from './useUser'
import Swal from 'sweetalert2'
export function useIncomes ({ reset }) {
  const date = new Date()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()
  const [incomes, setIncomes] = useState([])
  const { getToken, dataUser } = useUser()
  const [error, setError] = useState(null)
  const [incomeSelected, setIncomeSelected] = useState({})
  const [modalEditIncome, setModalEditIncome] = useState(false)
  const [monthViewed, setMonthViewed] = useState(currentMonth)

  const searchAllIncomes = (month = currentMonth, year = currentYear) => {
    setError(null)
    getIncomes({ token: getToken, month, year })
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

  const removeIncome = (id) => {
    removeIncomeService({ token: getToken, id })
      .then(res => {
        if (res.status === 200) {
          Swal.fire(
            'Atención!',
            'Ingreso eliminado con exito!',
            'success'
          )
          return searchAllIncomes()
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  const handlerClickRemoveIncome = () => {
    setError(null)
    if (!incomeSelected.id) {
      return setError('Debe seleccionar un ingreso para Eliminar')
    }
    Swal.fire({
      title: 'Esta seguro de eliminar el ingreso?',
      icon: 'warning',
      confirmButtonColor: '#e53e3e',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeIncome(incomeSelected.id)
      }
    })
  }

  const handlerUpdateSelectedIncome = ({ itemUpdate }) => {
    setError(null)
    setIncomeSelected(prevState => ({ ...prevState, ...itemUpdate }))
  }

  const handlerChangeIncomeSelected = (incomeSelected) => {
    setError(null)
    setIncomeSelected(incomeSelected)
  }

  const handlerClickEdit = () => {
    setError(null)
    if (!incomeSelected.id) {
      return setError('Debe seleccionar un ingreso para editar')
    }
    return setModalEditIncome(true)
  }

  const updateIncome = () => {
    setError(null)
    if (!incomeSelected.id) return setError('Debe seleccionar un ingreso para editar')
    if (!incomeSelected.value || !incomeSelected.description) return setError('Debe completar todos los campos')

    const idIncome = incomeSelected.id
    const incomeUpdate = {
      value: Number(incomeSelected.value),
      description: incomeSelected.description
    }
    updateIncomeService({ token: getToken, id: idIncome, data: incomeUpdate })
      .then(res => {
        if (res.status === 200) {
          Swal.fire(
            'Atención!',
            'Ingreso actualizado con exito!',
            'success'
          )
          setModalEditIncome(false)
          return searchAllIncomes()
        }
      })
      .catch(err => {
        setError(err.message)
      }
      )
  }
  const handlerChangeMonthViewed = (action) => {
    if (action === 'sum') {
      if (monthViewed === 11) {
        setMonthViewed(1)
        searchAllIncomes(1)
      } else {
        searchAllIncomes(monthViewed + 1)
        setMonthViewed(prevState => prevState + 1)
      }
    } else {
      if (monthViewed === 0) {
        setMonthViewed(12)
        searchAllIncomes(12)
      } else {
        searchAllIncomes(monthViewed - 1)
        setMonthViewed(prevState => prevState - 1)
      }
    }
  }
  return {
    searchAllIncomes,
    incomes,
    createIncome,
    error,
    handlerChangeIncomeSelected,
    handlerClickEdit,
    modalEditIncome,
    setModalEditIncome,
    incomeSelected,
    handlerUpdateSelectedIncome,
    updateIncome,
    handlerClickRemoveIncome,
    monthViewed,
    handlerChangeMonthViewed
  }
}
