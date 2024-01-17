import { Answer } from "./Answer";
import { Assignment } from "./Assignment";
import { Question } from "./Question";

export interface Response {
    // id: number;
    questionResult: number;
    answerId: number;
    assignQuizId: number;
    questionId: number;

    // questionResult?: number;
    // assignTest: {
    //     assignTestId: number;
    // };
    // validation: {
    //     answer: Answer;
    //     question: Question;
    //     points: number;
    // };
}