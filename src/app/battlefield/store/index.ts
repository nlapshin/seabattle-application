import { ActionReducerMap, createSelector, createFeatureSelector }  from '@ngrx/store';

import { BattlefieldState, FieldState } from './model';

import { battlefieldReducer } from './reducer';
import * as fieldSelectors from './selectors';

export const battlefieldReducers = battlefieldReducer;

export const selectBattlefield = (state: BattlefieldState) => state.battlefield;

export const selectFieldList = createSelector(
  selectBattlefield,
  fieldSelectors.selectFieldList
);

export const selectFieldWinner = createSelector(
  selectBattlefield,
  fieldSelectors.selectFieldWinner
);