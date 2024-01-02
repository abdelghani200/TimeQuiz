import { Teacher } from "./Teacher";

export interface Quiz{
    id: number;
    title: String;
    start_Date: Date;
    end_Date: Date;
    successScore: String;
    viewAnswer: Boolean;
    maxAttempts: number;
    remarks:String;
    instructions: String;
    teacher: Teacher
}