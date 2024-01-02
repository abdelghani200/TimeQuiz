import { Assignment } from "src/app/models/Assignment";

export interface AssignmentState {
    assignments: Assignment[];
}

export const initialState: AssignmentState = {
    assignments: [],
}