import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

const width = {
  sm: 'sm:my-8 sm:w-full sm:max-w-sm sm:p-6',
  lg: 'w-full max-w-lg p-6',
  xl: 'w-full max-w-2xl p-6',
  full: 'w-4/5 p-6 my-8'
}
export function Modal ({ open, setOpen, showIcon = false, size = 'sm', children, title = '' }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >

              <Dialog.Panel className={`relative transform overflow-auto rounded-lg bg-white px-4 pt-2 pb-4 text-left shadow-xl transition-all ${width[size] !== undefined ? width[size] : width.sm}`}>
                <div>
                  {showIcon && (

                    <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                      <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                    </div>
                  )}
                  {!showIcon && (
                    <div className='flex flex-col'>
                      <Dialog.Title as='h3' className='text-lg font-bold leading-6 text-gray-800 capitalize flex  justify-between my-2 items-center'>
                        {title}
                        <button
                          className='inline-flex w-auto justify-center rounded-md border border-transparent bg-rose-700 px-1 py-1 text-base font-medium text-white shadow-sm hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2 sm:text-sm'
                          onClick={() => setOpen(false)}
                        >Cerrar
                        </button>
                      </Dialog.Title>
                      <hr className='text-rose-900 border-rose-600' />
                    </div>
                  )}

                  <div className='mt-2'>
                    {children}
                  </div>
                </div>
                <div className='mt-5 sm:mt-6' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
