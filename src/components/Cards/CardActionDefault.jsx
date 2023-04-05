import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function CardActionDefault ({ title, children, button }) {
  const icons = {
    faPlus
  }
  return (
    <>
      <div className='shadow-lg rounded-lg my-4   mx-2'>
        <div className='border-b-0  bg-rose-600 px-4 py-5 sm:px-6 rounded-t-lg'>
          <div className='-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap'>
            <div className='ml-4 mt-2'>
              <h3 className='text-lg  leading-6 font-medium text-brown-900'>{title}</h3>
            </div>
            <div className='ml-4 mt-2 flex-shrink-0'>
              <button
                type='button'
                className='relative inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-brown-900 shadow-sm hover:bg-rose-900 hover:text-white focus:outline-none focus:ring-2 hover:shadow-2xl focus:ring-rose-600 focus:ring-offset-1'
                onClick={() => button.fn()}
              >
                {button.text}
                <FontAwesomeIcon icon={icons[button.icon]} size='lg' className='ml-2' />
              </button>
            </div>
          </div>
        </div>
        <div className='px-6 py-4'>
          {children}
        </div>
        {/*   <div className='px-6 pt-4 pb-2'>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>#photography</span>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>#travel</span>
          <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>#winter</span>
        </div> */}
      </div>
    </>
  )
}
