import Homelashes from '../assets/logofull.png'
import img1 from '../assets/bg_lashes.jpg'
import { ListTechniques } from '../components/ListTechniques/ListTechniques'
import { ProductList } from '../components/ProductList/ProductList'
const Home = () => {
  return (
    <>
      <img src={img1} alt='lash' className='md:absolute z-0 bg-gradient-to-r from-cyan-500 to-blue-500' />
      <div className='grid grid-cols-2 gap-3 ml-22 mt-6 xl:mt-24'>
        <div className='col-span-2 md:col-span-1 relative mx-auto my-auto h-auto max-w-none text-left flex flex-col  '>
          <h1 className='font-bold text-2xl  md:text-xl lg:text-4xl xl:text-5xl text-gray-800 leading-tigh'>
            Resalta tu
            <span className='md:text-white font-bold'> belleza </span>
            natural
          </h1>
          <p className='font-semibold text-gray-800 flex xl:justify-end  text-xl'>Pestañas Hermosas en todo momento </p>
          <ListTechniques className='mt-4 md:mt-8 text-xl font-semibold text-gray-800 listLash lg:ml-2' />
        </div>
      </div>
      <img src={Homelashes} alt='lash' className='md:relative w-2/3 md:w-1/3 xl:mt-12 mx-auto md:mx-0' />
      <div className='grid grid-cols-3 md:mt-10 2xl:mt-46 3xl:mt-56'>
        <ProductList />
      </div>
    </>
  )
}

export {
  Home
}
