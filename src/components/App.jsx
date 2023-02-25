
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { RoutesList } from './Routes'
import { Layouts } from './Layout/Layout'
import { UserContextProvider } from '../context/UserContext'
function App () {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Layouts>
          <RoutesList />
        </Layouts>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
