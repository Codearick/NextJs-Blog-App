import React, { useId } from 'react'

const Select = ({
    label,
    options,
    className = " ",
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className={className}>{label}</label>}
            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options && options.map(option => (
                    <option key={id} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)