import { Teacher } from "src/app/models/Teacher";

export interface TeacherState {
    teachers: Teacher[];
}

export const initialState: TeacherState = {
    teachers: [],
}