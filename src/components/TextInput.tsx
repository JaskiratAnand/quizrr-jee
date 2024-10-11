"use client"

import { memo } from "react";

const TextInput = memo(({ answer, setAnswer }: {
    answer: string, 
    setAnswer: (value: string) => void
}) => {
    return <div>
        <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="block w-full p-2 border font-medium border-neutral-400 bg-blue-950 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Search Mockups, Logos..."
            required
        />
    </div>
});
TextInput.displayName = "TextInput";

export const TextInput2 = memo(({ answer, setAnswer }: {
    answer: string, 
    setAnswer: (value: string) => void
}) => {
    return <div>
        <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="block w-full bg-neutral-200 p-2 border font-medium rounded-lg" 
            placeholder="Search Mockups, Logos..."
            required 
        />
    </div>
});
TextInput2.displayName = "TextInput2";

export default TextInput;