"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/db";

export async function submitAttempt (
    answers: {
        questionId: string;
        answer: string;
    }[], 
    testId: string
){
    const session = await getServerSession(authOptions);
    const userId: string = session?.user?.id;
    let correctCount = 0;

    try {
        const testResult = await prisma.testResult.create({
            data: {
                userId: userId,
                testId: testId
            }
        });

        const questions: {
            id: string,
            correctAns: string
        }[] = await prisma.question.findMany({
            where: {
                testId: testId
            },
            select: {
                id: true,
                correctAns: true
            }
        });

        const correctAnswersMap = new Map(questions.map(q => [q.id, q.correctAns]));

        for (const answer of answers) {
            const correctAnswer = correctAnswersMap.get(answer.questionId);
            const isCorrect: boolean = correctAnswer ? correctAnswer.includes(answer.answer) : false;

            if (isCorrect) {
                correctCount++;
            }

            await prisma.answers.create({
                data: {
                    testResultId: testResult.id,
                    questionId: answer.questionId,
                    answer: answer.answer,
                    correct: isCorrect
                }
            });
        }

        await prisma.testResult.update({
            where: { id: testResult.id },
            data: { result: correctCount }
        });

    } catch (err) {
        console.error("Error while submitting answers:", err);
        throw new Error("Error while submitting answers: ");
    }
    
}