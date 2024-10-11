import React from 'react';

export default function Button({ title, className, onClick }: { 
    title: string
    className?: string
    onClick?: () => void
}) {
    return <>
        <button 
            type='button'
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    </>
}

export const Button2 = ({ id, title, className, onClick, disabled }: { 
    id?: string
    title: string
    className?: string
    onClick?: () => void
    disabled?: boolean
}) => {
    return <>
        <button 
            id={id}
            type='button'
            className={`${className} my-1 focus:ring-4 focus:ring-blue-300 font-medium px-5 py-2.5 me-2 focus:outline-none`}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    </>
};