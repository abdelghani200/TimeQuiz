import { Assignment } from "./Assignment";
import { Validation } from "./Validation";

export interface Reponse{
    id:number;
    played: number;
    assignQuiz: Assignment;
    validation: Validation
}