"use client"
import Image from "next/image"
import Button from "./ui/Button"
import { memo, useCallback, useState } from "react"
import { submitAttempt } from "@/lib/actions/submitAttempt";
import { useRouter } from "next/navigation";
import MCQOptions from "./MCQOptions";
import TrueOrFalseOptions from "./TrueOrFalseOptions";
import TextInput from "./TextInput";

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
}
) => {
    return <> 
        <div key={question.id} className="w-full mx-auto my-5 p-5 bg-neutral-900 rounded-lg border">
            <h1 className="text-xl pb-2">Que {idx + 1}. {question.qtitle}</h1>

            {question.imgLink &&
                <Image
                    src={question.imgLink}
                    alt={idx.toString()}
                    width={300}
                    height={300}
                    className="rounded-lg items-center justify-center mx-auto"
                />
            }

            <div className="mt-2 mx-2">
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
                        <TextInput 
                            answer={answers[question.id] || ""}
                            setAnswer={(value: string) => handleOptionChange(question.id, value)}
                        />
                }
            </div>
        </div>
    </>
});
Question.displayName = "Question";

export default function TestView({ questions, testId }: {
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
    }

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


    return <>
        <div className="p-6">
            <div>{questions.map((question, idx) => {
                return <Question 
                    key={question.id} 
                    idx={idx} 
                    question={question} 
                    handleOptionChange={handleOptionChange} 
                    answers={answers}
                /> 
            })}</div>
        </div>

        <footer>
            <div className="px-6">
                <Button 
                    title="Submit Test" 
                    className="mx-auto" 
                    onClick={async () => handleSubmit(answers, testId)} 
                />
            </div>
        </footer>
    </>
}