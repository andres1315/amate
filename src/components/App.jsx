
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { RoutesList } from './Routes'
import { Layouts } from './Layout/Layout'

function App () {
  return (
    <BrowserRouter>
      <Layouts>
        <RoutesList />
      </Layouts>
    </BrowserRouter>
  )
}

export default App
