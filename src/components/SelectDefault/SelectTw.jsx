import { Controller } from 'react-hook-form'

import Select from 'react-select'
export function SelectTw ({ id, nameselect, label, control, options, txtrequired = '' }) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-rose-700'>
        {label}
      </label>
      <Controller
        name={nameselect}
        rules={{ required: txtrequired }}
        control={control}
        defaultValue=''
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            theme={(theme) => ({
              ...theme,
              borderRadius: 1,
              colors: {
                ...theme.colors,
                primary25: 'dangerLight',
                primary: 'pink'
              }
            })}
            id={id}
            className='rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 mt-1 block w-full sm:text-sm border-gray-300 outline-red-500'
            name={name}
            value={options.find((obj) => obj.value === value)}
            onChange={(val) => onChange(val.value)}
            options={options}
            ref={ref}
            onBlur={onBlur}
          />
        )}
      />

    </div>
  )
}
