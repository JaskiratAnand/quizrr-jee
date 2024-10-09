"use client"
import Button from "./Button"

export default function TestHeader({ id, title, createdAt, questionCount }: {
    id: string,
    title: string,
    createdAt: string,
    questionCount: number
}) {

    return <> 
        <header className="p-6 border rounded-xl border-neutral-400 items-center bg-neutral-900">
            <h1 className="text-3xl  p-2 font-semibold text-blue-500" >
                {title}
            </h1>
            <div className="flex flex-row">
                <p className="text-sm pl-2 py-2">
                    {createdAt} |
                </p>
                <p className="text-sm pl-1 py-2">
                    Question(s): {questionCount}
                </p>
            </div>
            <div className="p-2 mt-4">
                <Button title={"Start Test"} onClick={() => {
                    window.location.href = `/start-test/${id}`
                }} />
            </div>
        </header>
    </>
}