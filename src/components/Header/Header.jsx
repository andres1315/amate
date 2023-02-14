import { NavLink } from 'react-router-dom'
import { Navbar } from 'flowbite-react'
import logo from '../../assets/logo.png'
const Header = () => {
  return (
    <Navbar fluid rounded className='pt-2 bg-white'>
      <Navbar.Brand href='/'>
        <img src={logo} className='mr-3 h-24 sm:h-9' alt='Ámate' />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${
              isActive
                ? 'border-rose-500 text-rose-500'
                : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'
            } `}
        >
          Home
        </NavLink>
        <NavLink
          to='/shop'
          className={({ isActive }) =>
            `text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent  ${
              isActive
                ? 'border-rose-500 text-rose-500 '
                : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'
            } `}
        >
          Tienda
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${
              isActive
                ? 'border-rose-500 text-rose-500'
                : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'
            } `}
        >
          Nosotros
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${
              isActive
                ? 'border-rose-500 text-rose-500'
                : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'
            } `}
        >
          Contacto
        </NavLink>
        <NavLink
          to='/services'
          className={({ isActive }) =>
            `text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${
              isActive
                ? 'border-rose-500 text-rose-500'
                : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'
            } `}
        >
          Servicios
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  )
}

export { Header }
