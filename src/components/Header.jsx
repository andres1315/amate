import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ArrowPathIcon,Bars3Icon,ChartBarIcon,CursorArrowRaysIcon,ShieldCheckIcon,Squares2X2Icon,XMarkIcon,} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'


const solutions = [
  {
    name: 'Product 1',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Product 2',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  { name: 'Product 3', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
  {
    name: 'Product 4',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: Squares2X2Icon,
  },
  {
    name: 'Product 5',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: ArrowPathIcon,
  },
]

const Header =() =>{
  return (
    <Popover className="relative bg-white ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-300 py-1 md:justify-start md:space-x-10 ">
          <div className="flex justify-start lg:w-0 lg:flex-1 ">
            <a href="#">
              <span className="sr-only block">Ámate</span>
              <img
                className="w-16 md:w-20 lg:w-24"
                src="../src/assets/Logo.png"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <NavLink to="/" className={({isActive})=>`text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${isActive ? 'border-rose-500 text-rose-500' : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'} `}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({isActive})=>`text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent  ${isActive ? 'border-rose-500 text-rose-500 ' : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'} `}>
              Tienda
            </NavLink>
            <NavLink to="/about" className={({isActive})=>`text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${isActive ? 'border-rose-500 text-rose-500' : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'} `}>
              Nosotros
            </NavLink>
            <NavLink to="/contact" className={({isActive})=>`text-lg my-2 lg:text-base lg:mx-6 lg:my-0 font-bold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent ${isActive ? 'border-rose-500 text-rose-500' : 'hover:border-rose-500 hover:text-rose-500  text-gray-700'} `}>
              Contacto
            </NavLink>
            
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <NavLink
              to="/services"
              className="lg:mx-0 px-8 py-2 rounded-full text-lg bg-rose-500 text-gray-100 hover:bg-rose-100 hover:text-rose-500  border-b-0 hover:border-2 hover:border-rose-500 font-bold"
            >
              Servicios
            </NavLink>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="../src/assets/Logo1.png"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-center text-base font-medium text-gray-900 hover:text-gray-700">
                  Nosotros
                </a>

                <a href="#" className="text-center text-base font-medium text-gray-900 hover:text-gray-700">
                  Contacto
                </a>
                <a href="#" className="text-center  rounded-full text-base bg-rose-500 text-gray-100 hover:bg-rose-700 hover:text-gray-200  border-b-0 font-semibold">
                  Servicios
                </a>
                
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}



export{
  Header
}