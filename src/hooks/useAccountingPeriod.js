import { useEffect, useState } from 'react'
import { getAccountingPeriodService } from '../pages/dashboard/CashFlow/services'
import { useUser } from './useUser'
import { createAccountingPeriodService, openClosePeriodService } from '../services/accountingPeriods'

export const useAccountingPeriod = () => {
  const [accountingPeriod, setAccountingPeriod] = useState()
  const [error, setError] = useState(null)
  const { getToken } = useUser()
  const [modalAccPeriods, setModalAccPeriods] = useState(false)

  useEffect(() => {
    searchAccountingPeriod()
  }, [])

  const searchAccountingPeriod = () => {
    setError(null)
    getAccountingPeriodService({ token: getToken })
      .then(accountingPeriod => setAccountingPeriod(accountingPeriod.data))
      .catch(err => setError(err))
  }

  const modalCreateAccPeriod = () => setModalAccPeriods((prev) => !prev)

  const createAccountingPeriod = () => {
    setError(null)
    createAccountingPeriodService({ token: getToken })
      .then((res) => {
        if (res.status === 201) searchAccountingPeriod()
      })
      .catch(err => setError(err))
  }

  const handlerOpenClosePeriod = ({ id, open }) => {
    setError(null)
    openClosePeriodService({ token: getToken, id, open: !open })
      .then((res) => {
        if (res.status === 200) return searchAccountingPeriod()
      })
      .catch(err => setError(err))
  }

  return {
    error,
    accountingPeriod,
    modalAccPeriods,
    modalCreateAccPeriod,
    createAccountingPeriod,
    handlerOpenClosePeriod
  }
}
