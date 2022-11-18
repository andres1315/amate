
import { Header } from './Header'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Home } from './Home/Home'

const Shop = ()=> <h2>Shop</h2>
const About = ()=> <h2>About</h2>
const Contact = ()=> <h2>Contact</h2>
const Services = ()=> <h2>Servicios</h2>

function App() {


  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='*' element={<h1>no Encontrado</h1>}/>
      </Routes>
    </>
  )
}

export default App
