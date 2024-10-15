"use client"

import { memo, useCallback, useState } from "react"
import JEEInstructions from "./JEEInstructiions";
import { useRouter } from "next/navigation";
import { submitAttempt } from "@/lib/actions/submitAttempt";
import MCQOptions from "./MCQOptions";
import TrueOrFalseOptions from "./TrueOrFalseOptions";
import { TextInput2 } from "./TextInput";
import Image from "next/image";
import Button, { Button2 } from "@/components/ui/Button";
import TestButtons from "./TestButtons";
import NavigateButtons from "./NavigateButtons";

const QuestionButtons = memo(({idx, setNavigateQue, questionsLength}: {
    idx: number,
    setNavigateQue: (value: number) => void,
    questionsLength: number
}) => {
    return <>
        <div className="flex items-center row-span-1 px-4 p-2 border-t-2 border-black">
            <div>
                <Button2
                    title={"SAVE & NEXT"} 
                    className="rounded-none bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-400" 
                    onClick={() => {
                        const navButton = document.getElementById(`nav-${idx}`);
                        if (navButton) {
                            navButton.style.backgroundColor = "#16a34a";
                            navButton.style.color = "white";
                            navButton.style.borderColor = "#16a34a";
                            navButton.style.borderRadius = "0%";

                            const existingIndicator = document.getElementById(`indicator-${idx}`);
                            if (existingIndicator) {
                                navButton.removeChild(existingIndicator);
                            }
                        }
                        if (idx < questionsLength - 1) {
                            setNavigateQue(idx + 1)
                        }
                    }}
                />
                <Button2
                    title={"CLEAR"} 
                    className="rounded-none bg-white text-black border-2 hover:bg-neutral-300"
                    onClick={() => {
                        const navButton = document.getElementById(`nav-${idx}`);
                        if (navButton) {
                            navButton.style.backgroundColor = "white";
                            navButton.style.color = "black";
                            navButton.style.borderColor = "black";
                            navButton.style.borderRadius = "0%";

                            const existingIndicator = document.getElementById(`indicator-${idx}`);
                            if (existingIndicator) {
                                navButton.removeChild(existingIndicator);
                            }
                        }
                    }}
                />
                <Button2
                    title={"SAVE & MARK FOR REVIEW"} 
                    className="rounded-none bg-orange-500 text-white border-2 border-orange-500 hover:bg-orange-600" 
                    onClick={() => {
                        const navButton = document.getElementById(`nav-${idx}`);
                        if (navButton) {
                            navButton.style.backgroundColor = "#9333ea";
                            navButton.style.color = "white";
                            navButton.style.borderColor = "#9333ea";
                            navButton.style.borderRadius = "50%";

                            const existingIndicator = document.getElementById(`indicator-${idx}`);

                            if (!existingIndicator) {
                                const indicator = document.createElement('div');
                                indicator.id = "indicator-" + idx;
                                indicator.classList.add("absolute", "h-4", "w-4", "bg-green-600", "-bottom-1", "-right-1", "rounded-full");

                                navButton.appendChild(indicator);
                            }
                        }
                    }}
                />
                <Button2
                    title={"MARK FOR REVIEW & NEXT"} 
                    className="rounded-none bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700" 
                    onClick={() => {
                        const navButton = document.getElementById(`nav-${idx}`);
                        if (navButton) {
                            navButton.style.backgroundColor = "#9333ea";
                            navButton.style.color = "white";
                            navButton.style.borderColor = "#9333ea";
                            navButton.style.borderRadius = "50%";

                            const existingIndicator = document.getElementById(`indicator-${idx}`);
                            if (existingIndicator) {
                                navButton.removeChild(existingIndicator);
                            }
                        }
                        if (idx < questionsLength - 1) {
                            setNavigateQue(idx + 1)
                        }
                    }}
                />
            </div>
        </div>
    </>
});
QuestionButtons.displayName = "QuestionButtons";

const Question = memo(({idx, question , handleOptionChange, answers, setNavigateQue, questionsLength}: {
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
    setNavigateQue: (value: number) => void
    questionsLength: number
})  => {
    return <>
        <div className="h-full flex flex-col row-span-6 overflow-scroll">
            <h1 className="text-2xl font-semibold p-4 pb-2">
                Question {idx + 1}:
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
        <QuestionButtons 
            idx={idx}
            setNavigateQue={setNavigateQue}
            questionsLength={questionsLength}
        />
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
    const [navigateQue, setNavigateQue] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
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

    const setFullScreen = () => {
        document.documentElement.requestFullscreen();
    }

    if (!isFullScreen) {
        return (
            <div className='flex flex-col items-center justify-center h-screen w-full'>
                <div className="max-w-96 flex flex-col items-center justify-center gap-2 border border-neutral-200 p-5 rounded-xl bg-neutral-200">
                    <h1 className="text-xl font-semibold text-blue-600">JEE Format Test</h1>
                    <p className="py-2">The test requires fullscreen window to start</p>
                    <Button 
                        title={"Start Test"}
                        onClick={() => {
                            setFullScreen();
                            setIsFullScreen(true);
                        }}
                    />
                </div>
            </div>
        );
    }

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
                    idx={navigateQue} 
                    question={questions[navigateQue]} 
                    handleOptionChange={handleOptionChange}
                    answers={answers}
                    setNavigateQue={setNavigateQue}
                    questionsLength={questions.length}
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