import { useState } from 'react'
import { getAccountingPeriodService } from '../pages/dashboard/CashFlow/services'
import { useUser } from './useUser'

export const useAccountingPeriod = () => {
  const [accountingPeriod, setAccountingPeriod] = useState()
  const [error, setError] = useState(null)
  const { getToken } = useUser()
  const [modalAccPeriods, setModalAccPeriods] = useState(false)

  const getAccountingPeriod = () => {
    setError(null)
    getAccountingPeriodService({ token: getToken })
      .then(accountingPeriod => setAccountingPeriod(accountingPeriod.data))
      .catch(err => setError(err))
  }

  const modalCreateAccPeriod = () => setModalAccPeriods((prev) => !prev)

  return { getAccountingPeriod, error, accountingPeriod, modalAccPeriods, modalCreateAccPeriod }
}
