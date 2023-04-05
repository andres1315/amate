import { listOfTechniques } from '../../data/techniques'

export function ProductList () {
  return (
    <div className='bg-rose-300 md:bg-white col-span-3 flex'>
      <div className='mx-auto py-8 md:py-20 px-6  lg:px-8 '>
        <h2 className='text-2xl  font-bold tracking-tight text-gray-600 md:text-rose-600'>Nuestras tecnicas</h2>
        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5  2xl:gap-x-6'>
          {listOfTechniques.map((product) => (
            <div key={product.name} className='group relative'>
              <div className='min-h-120  overflow-hidden rounded-md group-hover:opacity-75 shadow-lg hover:shadow-rose-300  lg:h-120'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm font-bold text-gray-600 md:text-rose-600'>
                    {product.name}
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.name}</p> */}
                </div>
                {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
