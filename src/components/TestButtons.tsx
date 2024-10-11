import { memo } from "react"
import { Button2 } from "./ui/Button"

const TestButtons = memo(({navigateQue, setNavigateQue, questionsLength, handleSubmit}: {
    navigateQue: number,
    setNavigateQue: (value: number) => void,
    questionsLength: number,
    handleSubmit: () => void
}
) => {
    return <>
        <div className="flex flex-row justify-between items-center p-2 bg-neutral-300">
            <div>
                <Button2
                    title={"<< BACK"} 
                    className="rounded-none bg-white text-neutral-500 active:text-black border-2 border-neutral-500 active:border-black  hover:bg-neutral-300 disabled:bg-neutral-300 disabled:active:border-neutral-500 disabled:active:text-neutral-500" 
                    onClick={() => setNavigateQue((navigateQue >= 0)? navigateQue - 1: 0)}
                    disabled={navigateQue === 0}
                />
                <Button2
                    title={"NEXT >>"} 
                    className="rounded-none bg-white text-neutral-500 active:text-black border-2 border-neutral-500 active:border-black hover:bg-neutral-300 disabled:bg-neutral-300 disabled:active:border-neutral-500 disabled:active:text-neutral-500" 
                    onClick={() => setNavigateQue((navigateQue < questionsLength)? navigateQue + 1: questionsLength - 1)}
                    disabled={navigateQue === questionsLength - 1}
                />
            </div>
            <div>
                <Button2
                    title={"SUBMIT"} 
                    className="rounded-none bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 hover:border-green-700" 
                    onClick={() => handleSubmit()}
                />
            </div>
        </div>
    </>
});
TestButtons.displayName = "TestButtons";

export default TestButtons;