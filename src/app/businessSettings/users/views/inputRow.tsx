'use client';

import React from 'react';

interface InputRowProps {
    label: string,
    name: string,
    type: string,
    handleChange: (name: string, value: string) => void,
    placeholder: string,
    value: string;
}

const InputRow = ({ label, name, type, handleChange, placeholder, value }: InputRowProps) => {
    return (
        <div className='grid space-y-2 w-full '>
            <label htmlFor="" className='text-indigo-900 font-semibold'>{label || name}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={(e) => handleChange(name, value)}
                placeholder={placeholder}
                className=' rounded-md py-2 px-2 outline-none shadow-sm border w-full'
            />
        </div>
    );
};

export default InputRow;