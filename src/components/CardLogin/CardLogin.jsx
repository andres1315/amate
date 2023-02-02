import { Card, Label, TextInput, Button } from 'flowbite-react'
import bglogin from '../../assets/bg-login.jpg'

export const CardLogin = ({ register, handleSubmit, onSubmit }) => {
  return (
    <>
      <img src={bglogin} alt='lash' className='md:absolute w-full max-h-full' />
      <div className='w-full md:w-1/5 mx-auto col-span-1 z-0'>
        <Card>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email1' value='Usuario' />
              </div>
              <TextInput
                id='user'
                type='text'
                placeholder='Amate...'
                required
                className='focus:border-rose-500 rounded-lg focus:ring-2 focus:ring-rose-400 w-full'
                {...register('user', {
                  required: true,
                  maxLength: 15
                })}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='password1' value='Contraseña' />
              </div>
              <TextInput
                id='password1'
                type='password'
                required
                className='border focus:border-rose-700 rounded-lg focus:ring-2 focus:ring-rose-700 w-full'
                {...register('password', {
                  required: true
                })}
              />
            </div>
            <Button
              type='submit'
              className='bg-rose-500 hover:bg-rose-700 focus:ring-rose-400 hover:bg-rose-800 font-black  hover:border-rose-700 drop-shadow-xl border-2 '
            >
              Ingresar
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}
