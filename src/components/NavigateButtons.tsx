"use cilent"
import { memo } from "react";
import { Button2 } from "@/components/ui/Button";


const NavigateButtons = memo(({setNavigateQue, questionsLength}: {
    setNavigateQue: (idx: number) => void,
    questionsLength: number
}) => {

    return <>
        <div className="border p-4 row-span-5">
            <div className="flex flex-row flex-wrap overflow-scroll">
                {Array.from({length: questionsLength}, (_, idx) => {
                    return <>
                        <Button2
                            key={idx + 1}
                            id={"nav-" + (idx).toString()}
                            title={(idx + 1).toString()}
                            className="relative h-10 w-10 m-1 border-2 border-black flex justify-center items-center rounded-sm hover:bg-neutral-200"
                            onClick={() => setNavigateQue(idx)}
                        />
                    </>
                })}
            </div>
        </div>
    </>
});
NavigateButtons.displayName = "NavigateButtons";

export default NavigateButtons;