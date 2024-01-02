import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LevelState } from '../state/level.state';


export const selectLevelState = createFeatureSelector<LevelState>('levels');

export const selectLevels = createSelector(
    selectLevelState,
    (state: LevelState) => state.levels
);

