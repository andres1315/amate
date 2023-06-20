
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { RoutesList } from './components/Routes'
import { Layouts } from './components/Layout/Layout'
import { UserContextProvider } from './context/UserContext'
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
