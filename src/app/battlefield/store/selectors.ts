import { transform, groupBy, flatten, random } from 'lodash';

import { FieldState } from './model';

import { IField } from '../models/field';
import { CellStatus } from '../models/cell';

export const selectFieldList = (store: FieldState, player: string) => store[player];

export const selectFieldWinner = (store: FieldState) => {
	let players = Object.keys(store);
	if (players.length < 2) return "";

	let playersState = groupBy(players, player => checkFieldState(store[player]));

	return playersState.ingame.length == 1 ? playersState.ingame[0] : "";
}

function checkFieldState(field: IField) {
	let ships = flatten(field).filter(cell => cell.ship === true);

	return ships.some(ship => ship.status !== CellStatus.DAMAGED) ? "ingame" : "lose";
};