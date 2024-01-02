import { createAction, props } from "@ngrx/store";
import { Level } from "src/app/models/Level";

export const loadLevels = createAction('[Level] load Levels');

export const loadLevelsSuccess = createAction('[Level] Load Levels Success', props<{ levels: Level[] }>());
export const addLevel = createAction('[Level] Add Level', props<{ level: Level }>());
export const updateLevel = createAction('[Level] Update Level', props<{ level: Level }>());
export const deleteLevel = createAction('[Level] Delete Level', props<{ levelId: number }>());
export const loadLevelsFailure = createAction('[Level] Load Levels Failure', props<{ error: any }>());
export const resetLevels = createAction('[Level] Reset Levels');