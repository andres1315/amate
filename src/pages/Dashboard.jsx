import { useState,Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import {Bars3Icon, BookmarkSquareIcon, FireIcon, HomeIcon, InboxIcon, UserIcon,XMarkIcon} from '@heroicons/react/24/outline'
import { dashboardNavigation } from '../data/dashboardModule'
import imgAmate from '../assets//logo.png'
import logoAmate from '../assets/logofull.png'
import { HomeDashboard } from './dashboard/HomeDashboard'
import { Income } from './dashboard/Income'
import { Payments } from './dashboard/Payments'
import { CashFlow } from './dashboard/CashFlow'
import { Order } from './dashboard/Order'
export const Dashboard = () => {
  const [userLogged,setUserLogged]  =useState(JSON.parse(localStorage.getItem('loggedUser')))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuShow,setMenuShow]=useState(<HomeDashboard/>)
  
  const componentDashboard={
    HomeDashboard,
    Income,
    Payments,
    CashFlow,
    Order
  }
  const componentMappingIcon ={
    BookmarkSquareIcon,
    FireIcon,
    HomeIcon,
    InboxIcon,
    UserIcon
  }

  if(!userLogged?.user) return <Navigate to='/login'/>

  return (
    <>
      <div className="flex h-screen">
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-4">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-12 w-auto"
                        src={logoAmate}
                        alt="Your Company"
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {dashboardNavigation.map((item) =>{
                          const IconMap=componentMappingIcon[item.icon]

                          return (
                            
                            <a
                              key={item.name}
                              href={item.href}
                              className="group flex items-center rounded-md p-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                              <IconMap
                                className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            
                          )
                        })}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img className="inline-block h-12 w-12 rounded-full" src={imgAmate} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{userLogged.name}</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            Account Settings
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-20 flex-col">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-indigo-600">
              <div className="flex-1">
                <div className="flex items-center justify-center bg-indigo-700 py-4">
                  <img
                    className="h-12 w-auto"
                    src={logoAmate}
                    alt="Your Company"
                  />
                </div>
                <nav aria-label="Sidebar" className="flex flex-col items-center space-y-3 py-6">
                  {dashboardNavigation.map((item) =>{
                    const IconMap=componentMappingIcon[item.icon]
                    const ComponentDashboard =componentDashboard[item.page]
                    return (
                      <div
                        key={item.name}
                        href={item.href}
                        className="flex flex-col items-center rounded-lg p-4 text-indigo-200 hover:bg-indigo-700"
                        onClick={()=>setMenuShow(<ComponentDashboard/>)}
                      >
                        <IconMap className="h-6 w-6" aria-hidden="true"  />
                        <span className="font-normal capitalize truncate text-xs">{item.name}</span>
                        
                        

                        
                      </div>
                    )
                  } )}
                </nav>
              </div>
              <div className="flex flex-shrink-0 pb-5">
                <a href="#" className="w-full flex-shrink-0">
                  <img className="mx-auto block h-10 w-10 rounded-full" src={imgAmate} alt="" />
                  <div className="sr-only">
                    <p>{userLogged?.name}</p>
                    <p>Account settings</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile top navigation */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-indigo-600 py-2 px-4 sm:px-6 lg:px-8">
              <div>
                <img
                  className="h-12 w-auto"
                  src={logoAmate}
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <main className="flex flex-1 overflow-hidden">
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              {menuShow}
            </section>

     
          </main>
        </div>
      </div>
    </>
  )
}
