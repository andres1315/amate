import { createContext, useState } from 'react'

export const ContextUser = createContext({})

export function UserContextProvider ({ children }) {
  const [user, setUser] = useState(() => JSON.parse(window.localStorage.getItem('loggedUser') || null))
  return (
    <ContextUser.Provider value={{ user, setUser }}>
      {children}
    </ContextUser.Provider>
  )
}
