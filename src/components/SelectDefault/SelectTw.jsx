import { Controller } from 'react-hook-form'

import Select from 'react-select'
export function SelectTw ({ id, nameselect, label, control, customer, children }) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-rose-700'>
        {label}
      </label>
      <Controller
        name={nameselect}
        control={control}
        defaultValue=''
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            id={id}
            name={name}
            value={customer.find((obj) => obj.value === value)}
            onChange={(val) => onChange(val.value)}
            options={customer}
            ref={ref}
            onBlur={onBlur}
          />
        )}
      />

    </div>
  )
}
