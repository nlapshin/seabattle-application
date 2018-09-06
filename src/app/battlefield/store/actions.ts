import { Action } from '@ngrx/store';

import { ICoord } from '../models/coord';

interface CreateFieldWithRandomShipsPayload {
  name: string;
  size: number;
  ships: string[];
}

interface SelectFieldCellPayload {
  name: string;
  coord: ICoord;
}

interface SelectRandomFreeFieldCellPayload {
  name: string;
}

export const CREATE_FIELD_WITH_RANDOM_SHIPS = 'Create field with random ships';
export const SELECT_FIELD_CELL = 'Select field cell';
export const SELECT_RANDOM_FREE_FIELD_CELL = 'Select random free field cell';

export class CreateFieldWithRandomShips implements Action {
  readonly type = CREATE_FIELD_WITH_RANDOM_SHIPS;
  constructor(public payload: CreateFieldWithRandomShipsPayload) { }
}

export class SelectFieldCell implements Action {
  readonly type = SELECT_FIELD_CELL;
  constructor(public payload: SelectFieldCellPayload) { }
}

export class SelectRandomFreeFieldCell implements Action {
  readonly type = SELECT_RANDOM_FREE_FIELD_CELL;
  constructor(public payload: SelectRandomFreeFieldCellPayload) { }
}

export type FieldActions = CreateFieldWithRandomShips | SelectFieldCell | SelectRandomFreeFieldCell;
