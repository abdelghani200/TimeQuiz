import { Validation } from "src/app/models/Validation";


export interface AppState {
    validations: ValidationState;
}

export interface ValidationState {
    validations: Validation[];
}
