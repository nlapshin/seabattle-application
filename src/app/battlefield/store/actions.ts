import { Action } from '@ngrx/store';

import { ICoord } from '../models/coord';

interface createFieldWithRandomShipsPayload {
  name: string,
  size: number,
  ships: string[]
}

interface selectFieldCellPayload {
  name: string,
  coord: ICoord
}

interface selectRandomFreeFieldCellPayload {
  name: string
}

export const CREATE_FIELD_WITH_RANDOM_SHIPS = 'Create field with random ships';
export const SELECT_FIELD_CELL = 'Select field cell';
export const SELECT_RANDOM_FREE_FIELD_CELL = 'Select random free field cell';

export class CreateFieldWithRandomShips implements Action {
  readonly type = CREATE_FIELD_WITH_RANDOM_SHIPS;
  constructor(public payload: createFieldWithRandomShipsPayload) { }
}

export class SelectFieldCell implements Action {
  readonly type = SELECT_FIELD_CELL;
  constructor(public payload: selectFieldCellPayload) { }
}

export class SelectRandomFreeFieldCell implements Action {
  readonly type = SELECT_RANDOM_FREE_FIELD_CELL;
  constructor(public payload: selectRandomFreeFieldCellPayload) { }
}

export type FieldActions = CreateFieldWithRandomShips | SelectFieldCell | SelectRandomFreeFieldCell;
