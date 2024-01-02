import { Quiz } from "./Quiz";
import { Student } from "./Student";

export interface Assignment {
    id: number;
    date_debut: string;
    date_fin: string;
    raison: string;
    score: number;
    attempt_number: number;
    score_final: number;
    quiz: Quiz;
    students: Student[];
    
}