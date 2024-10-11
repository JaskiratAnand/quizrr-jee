"use client"

import { memo } from "react";

const TrueOrFalseOptions = memo(({ selectedOption, handleOptionChange }: {
    selectedOption: string | null,
    handleOptionChange: (option: string) => void
}) => {
    return <>
        <div>
            <div className="flex items-center mb-4">
                <input 
                    id="true" 
                    type="radio" 
                    value="true" 
                    name="default-radio" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    checked={selectedOption === "true"}
                    onChange={() => handleOptionChange("true")} 
                />
                <label className="ms-2 font-medium">True</label>
            </div>
            <div className="flex items-center mb-4">
                <input 
                    id="false" 
                    type="radio" 
                    value="false" 
                    name="default-radio" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    checked={selectedOption === "false"}
                    onChange={() => handleOptionChange("false")}
                />
                <label className="ms-2 font-medium">False</label>
            </div>
        </div>
    </>
});
TrueOrFalseOptions.displayName = "TrueOrFalseOptions";

export default TrueOrFalseOptions;