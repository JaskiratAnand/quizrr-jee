"use client"
import { memo } from "react";

const MCQOptions = memo(({ options, selectedOption, handleOptionChange }: {
    options: string[],
    selectedOption: string | null,
    handleOptionChange: (answer: string) => void
}) => {
    return <>
        {options.map((option, i) => {
            return <div key={i}>
                <div className="flex items-center mb-4">
                    <input 
                        id={`radio-${i + 1}`} 
                        type="radio" 
                        value={option} 
                        name="default-radio" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" 
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                    />
                    <label className="ms-2 font-medium">{option}</label>
                </div>
            </div>
        })}
    </>
});
MCQOptions.displayName = "MCQOptions";

export default MCQOptions;