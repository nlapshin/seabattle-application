import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from './model';

import { GameplayStore } from './gameplay/models/store';
import { GameplayPlayer } from './gameplay/models/player';
import { gameplayReducer } from './gameplay/reducer';
import * as gameplaySelectors from './gameplay/selectors';

export const appReducers: ActionReducerMap<AppState> = {
  gameplay: gameplayReducer
}

export const selectGameplay = createFeatureSelector<AppState, GameplayStore>(
  'gameplay'
);

export const selectGameplayIsBegging = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayIsBegging
);

export const selectGameplayIsActive = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayIsActive
);

export const selectGameplayWasStarted = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayWasStarted
);

export const selectGameplayWasEnded = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayWasEnded
);

export const selectGameplayPlayers = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayPlayers
)

export const selectGameplayCheckStep = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayCheckStep
)

export const selectGameplayWinner = createSelector(
  selectGameplay,
  gameplaySelectors.selectGameplayWinner
)
