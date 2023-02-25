import { useContext, useCallback } from 'react'
import { ContextUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
export function useUser () {
  const { user, setUser } = useContext(ContextUser)
  const navigate = useNavigate()
  const login = useCallback(({ user }) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setUser(user)
  }, [setUser])

  const logout = useCallback(() => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    navigate('/login')
  }, [setUser])

  return {
    isLogged: Boolean(user?.token),
    login,
    logout,
    dataUser: user,
    getToken: user?.token
  }
}
