import { Level } from "src/app/models/Level";

export interface LevelState {
    levels: Level[];
}

export const initialState: LevelState = {
    levels: [],
};
