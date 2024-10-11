"use client"

import { memo, useCallback, useState } from "react"
import JEEInstructions from "./JEEInstructiions";
import { useRouter } from "next/navigation";
import { submitAttempt } from "@/lib/actions/submitAttempt";
import MCQOptions from "./MCQOptions";
import TrueOrFalseOptions from "./TrueOrFalseOptions";
import { TextInput2 } from "./TextInput";
import Image from "next/image";
import { Button2 } from "@/components/ui/Button";
import TestButtons from "./TestButtons";
import NavigateButtons from "./NavigateButtons";

const QuestionButtons = memo(({idx}: {
    idx: number
}) => {

    return <>
        <div className="flex items-center row-span-1 px-4 p-2 border-t-2 border-black">
            <div>
                <Button2
                    title={"SAVE & NEXT"} 
                    className="rounded-none bg-green-600 text-white border-2 border-green-600 hover:bg-green-700"
                    onClick={() => {console.log(idx)}}
                />
                <Button2
                    title={"CLEAR"} 
                    className="rounded-none bg-white text-black border-2 hover:bg-neutral-300" 
                />
                <Button2
                    title={"SAVE & MARK FOR REVIEW"} 
                    className="rounded-none bg-orange-500 text-white border-2 border-orange-500 hover:bg-orange-600" 
                />
                <Button2
                    title={"MARK FOR REVIEW & NEXT"} 
                    className="rounded-none bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700" 
                />
            </div>
        </div>
    </>
});
QuestionButtons.displayName = "QuestionButtons";

const Question = memo(({idx, question , handleOptionChange, answers}: {
    idx: number,
    question: {
        id: string;
        qtitle: string;
        imgLink: string | null;
        options: string[];
        type: string;
    },
    handleOptionChange: (questionId: string, answer: string) => void,
    answers: { [key: string]: string }
})  => {

    return <>
        <div className="h-full flex flex-col row-span-6 overflow-scroll">
            <h1 className="text-2xl font-semibold p-4 pb-2">
                Question {idx}:
            </h1>
            <hr className="border-b-2 border-black" />
            <div className="h-full py-4 px-5 font-serif">
                <p className="text-2xl pb-4">
                    {question.qtitle}

                </p>

                <div>
                    {question.imgLink && 
                        <Image
                            src={question.imgLink} 
                            alt={idx.toString()}
                            width={300}
                            height={300} 
                            className="w-64 h-64 mx-auto"
                        />
                    }
                </div>

                <div className="text-xl p-4">
                    {(question.type === "MCQ") ?
                        <MCQOptions 
                            options={question.options}
                            selectedOption={answers[question.id] || ""}
                            handleOptionChange={(answer: string) => handleOptionChange(question.id, answer)} 
                        /> :
                        (question.type === "TrueOrFalse") ?
                            <TrueOrFalseOptions
                                selectedOption={answers[question.id] || ""}
                                handleOptionChange={(answer: string) => handleOptionChange(question.id, answer)} 
                            /> :
                            <TextInput2
                                answer={answers[question.id] || ""}
                                setAnswer={(value: string) => handleOptionChange(question.id, value)}
                            />
                    }
                </div>
            </div>
        </div>
    </>
});
Question.displayName = "Question";

export default function JEETestView ({user, questions, testId}: {
    user: { name: string, email: string },
    questions: {
        id: string;
        instructions: string | null;
        qtitle: string;
        imgLink: string | null;
        options: string[];
        type: string;
    }[],
    testId: string
}) {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const handleOptionChange = (questionId: string, answer: string) => {
        setAnswers(
            prevAnswers => ({
                ...prevAnswers,
                [questionId]: answer
            })
        );
    };

    const handleSubmit = useCallback(async (
        answers: { [key: string]: string },
        testId: string
    ) => {
        alert("Submitting Test");
        const answer_list = [];
        for (const [questionId, answer] of Object.entries(answers)) {
            answer_list.push({questionId, answer: answer.toString()});
        }
        await submitAttempt(answer_list, testId);
        router.push('/results');
    }, [router]);

    const [navigateQue, setNavigateQue] = useState(0);

    return <>
        <header className="z-[100] border-b border-black">       
            <nav className="max-w-screen-xl flex items-center justify-between py-4 mx-auto">
                <div className="flex flex-col lg:flex-1">
                    <span className="grid grid-cols-2 text-lg font-medium whitespace-nowrap w-96">
                        <span className="col-span-1">
                            Candidate Name: 
                        </span>
                        <span className="col-span-1">
                            {user.name} 
                        </span>
                    </span>
                    <span className="grid grid-cols-2 text-lg font-medium whitespace-nowrap w-96">
                        <span className="col-span-1">
                            Candidate Email: 
                        </span>
                        <span className="col-span-1">
                            {user.email} 
                        </span>
                    </span>
                </div>
            </nav>
        </header>
        <div className="max-w-screen-xl py-2 grid grid-cols-12 mx-auto overflow-hidden">
            <div className="grid grid-rows-10 col-span-8">
                <Question
                    key={questions[navigateQue].id}
                    idx={navigateQue + 1} 
                    question={questions[navigateQue]} 
                    handleOptionChange={handleOptionChange}
                    answers={answers}
                />

                <QuestionButtons 
                    idx={navigateQue}
                />

                <TestButtons
                    navigateQue={navigateQue} 
                    setNavigateQue={setNavigateQue}
                    questionsLength={questions.length}
                    handleSubmit={() => handleSubmit(answers, testId)}
                />
            </div>
            <div className="grid grid-rows-10 col-span-4">
                <JEEInstructions />

                <NavigateButtons
                    setNavigateQue={setNavigateQue} 
                    questionsLength={questions.length} 
                />
            </div>
        </div>
    </>
};