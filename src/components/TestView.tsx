"use client"
import Image from "next/image"
import Button from "./Button"
import { useState } from "react"

import { submitAttempt } from "@/lib/actions/submitAttempt";

const MCQOptions = ({ options, selectedOption, handleOptionChange }: {
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
}

const TrueOrFalseOptions = ({ selectedOption, handleOptionChange }: {
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
}

const TextInput = ({ answer, setAnswer }: {
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
}

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

    const handleOptionChange = (questionId: string, answer: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    }


    return <>
        <div className="p-6">
            <div>{questions.map((question, idx) => {
                return <div key={question.id} className="w-full mx-2 my-5 p-5 bg-neutral-900 rounded-lg border">
                    <h1 className="text-xl pb-2">Que {idx + 1}. {question.qtitle}</h1>

                    {question.imgLink &&
                        <Image
                            src={question.imgLink}
                            alt={question.qtitle}
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
            })}</div>
        </div>

        <footer>
            <div className="px-6">
                <Button title="Submit Test" className="mx-2" onClick={async () => {
                    const answer_list = [];
                    for (const [questionId, answer] of Object.entries(answers)) {
                        answer_list.push({questionId, answer: answer.toString()});
                    }

                    await submitAttempt(answer_list, testId);
                    window.location.href = "/home";
                }} />
            </div>
        </footer>
    </>
}