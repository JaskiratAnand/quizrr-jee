import { memo } from "react";

const JEEInstructions = memo(() => {
    return <>
        <div className="row-span-3">
            <div className="m-2 p-2 h-[95%] border-4 border-black border-dotted">
                <div className="flex flex-col gap-6 py-10 px-10">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <div className="h-10 w-10 border-2 border-black flex justify-center items-center rounded-sm">1</div> 
                            Not Visited
                        </div>
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <div className="h-10 w-10 border-2 border-red-600 bg-red-600 text-white flex justify-center items-center rounded-sm">2</div> 
                            Not Answered
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <div className="h-10 w-10 border-2 border-green-600 bg-green-600 text-white flex justify-center items-center rounded-sm">3</div> 
                            Answered
                        </div>
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <div className="h-10 w-10 border-2 border-purple-600 bg-purple-600 text-white flex justify-center items-center rounded-full">4</div> 
                            Marked for Review
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <div className="relative h-10 w-10 border-2 border-purple-600 bg-purple-600 text-white flex justify-center items-center rounded-full">
                                5
                                <div className="absolute h-4 w-4 bg-green-600 -bottom-1 -right-1 rounded-full"></div> 
                            </div> 
                            Answered & Marked for Review 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
});
JEEInstructions.displayName = "JEEInstructions";

export default JEEInstructions;