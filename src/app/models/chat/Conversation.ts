import { Student } from "../Student";
import { Teacher } from "../Teacher";

export interface Conversation {
    id: number;
    teacher: Teacher;
    student: Student;
}