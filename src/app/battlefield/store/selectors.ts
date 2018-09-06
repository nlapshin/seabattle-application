import { groupBy, flatten } from 'lodash';

import { FieldState } from './model';

import { IField } from '../models/field';
import { CellStatus } from '../models/cell';

export const selectFieldList = (store: FieldState, player: string) => store[player];

export const selectFieldWinner = (store: FieldState) => {
  const players = Object.keys(store);
  if (players.length < 2) { return ''; }

  const playersState = groupBy(players, player => checkFieldState(store[player]));

  return playersState.ingame.length === 1 ? playersState.ingame[0] : '';
};

function checkFieldState(field: IField) {
  const ships = flatten(field).filter(cell => cell.ship === true);
  const isDamagedShips = ships.some(ship => ship.status !== CellStatus.DAMAGED);

  return isDamagedShips ? 'ingame' : 'lose';
}
