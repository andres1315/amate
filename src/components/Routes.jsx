import { Routes,Route } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'


const Shop = ()=> <h2>Shop</h2>
const About = ()=> <h2>About</h2>
const Contact = ()=> <h2>Contact</h2>
const Services = ()=> <h2>Servicios</h2>
const Blog = ()=> <h2>blog</h2>



const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>no Encontrado</h1>} />
    </Routes>
  )
}

export { RoutesList }
