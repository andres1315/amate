export function CardActionDefault ({ title, txtBtn }) {
  return (
    <>
      <div className='shadow-lg rounded-lg my-4  border  border-gray-200 mx-2'>
        <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-lg'>
          <div className='-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap'>
            <div className='ml-4 mt-2'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
            </div>
            <div className='ml-4 mt-2 flex-shrink-0'>
              <button
                type='button'
                className='relative inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
              >
                {txtBtn}
              </button>
            </div>
          </div>
        </div>
        <div class='px-6 py-4'>
          <div class='font-bold text-xl mb-2'>The Coldest Sunset</div>
          <p class='text-gray-700 text-base'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div class='px-6 pt-4 pb-2'>
          <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>#photography</span>
          <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>#travel</span>
          <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>#winter</span>
        </div>
      </div>
    </>
  )
}
