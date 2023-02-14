import { useLocation } from 'react-router-dom'
import { Header } from '../Header/Header'
const Empty = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}

const WithHeader = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

const Layouts = ({ children }) => {
  const location = useLocation()
  const { pathname } = { ...location }
  console.log({ location })

  if (pathname === '/login' || pathname === '/dashboard') {
    return <Empty>{children}</Empty>
  } else {
    return (
      <WithHeader>
        {children}
      </WithHeader>
    )
  }
}

export { Layouts }
