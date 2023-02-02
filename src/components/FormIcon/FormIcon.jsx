
export const FormIcon = ({ label, placeholder, children, register, type }) => {
  return (
    <>
      <label htmlFor='customer' className='block text-sm font-medium text-rose-700'>
        {label}
      </label>
      <div className='relative mt-1 rounded-md shadow-sm'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          {children}
        </div>
        <input
          type={type}
          name={label}
          id={label}
          className='block w-full rounded-md border-gray-300 pl-10 focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
          placeholder={placeholder}
          {...register}
        />
      </div>

    </>
  )
}
