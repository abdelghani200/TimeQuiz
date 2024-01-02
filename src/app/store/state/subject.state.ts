import { Subject } from "src/app/models/Subject";

export interface SubjectState {
    subjects: Subject[];
}

export const initialState: SubjectState = {
    subjects: [],
};
