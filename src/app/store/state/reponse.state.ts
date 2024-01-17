import { Response } from "src/app/models/Response";



export interface ReponseState {
    responses: Response[];
}

export const initialState: ReponseState = {
    responses: [],
};
