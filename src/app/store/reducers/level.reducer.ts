import { createReducer, on } from '@ngrx/store';
import * as LevelActions from '../actions/level.actions';
import { initialState, LevelState } from '../state/level.state';

export const levelReducer = createReducer(
    initialState,
    on(LevelActions.loadLevelsSuccess, (state, { levels }) => ({ ...state, levels })),
    on(LevelActions.addLevel, (state, { level }) => ({ ...state, levels: [...state.levels, level] })),
    on(LevelActions.updateLevel, (state, { level }) => {
        const updatedLevels = state.levels.map(l => (l.id === level.id ? { ...l, ...level } : l));
        return { ...state, levels: updatedLevels };
    }),
    on(LevelActions.deleteLevel, (state, { levelId }) => {
        const updatedLevels = state.levels.filter(l => l.id !== levelId);
        return { ...state, levels: updatedLevels };
    }),
    on(LevelActions.loadLevelsFailure, (state, { error }) => {
        console.error('Error loading levels:', error);
        return state;
    }),
    on(LevelActions.resetLevels, () => initialState)
);


export { LevelState } from '../state/level.state';