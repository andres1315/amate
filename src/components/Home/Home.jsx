import Homelashes from '../../assets/Homelashes.jpg'
const Home = ()=>{
  return (
    <>
    <main>
        <div className="grid grid-cols-2 gap-3">
          <div className='col-span-2 md:col-span-1 relative 
           text-center max-w-lg mx-auto lg:max-w-none lg:text-left'>
            <h1 className='font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tigh'>
              Tecnica en pestañas 
              <span className="text-rose-500"> for you.</span>
              </h1>
          </div>
          <div className='col-span-2 md:col-span-1 relative 
           text-center max-w-lg mx-auto lg:max-w-none lg:text-left'>
            <img src={Homelashes} alt="lash" />
          </div>
        </div>
      </main>
    </>
  )
}


export{
  Home
}