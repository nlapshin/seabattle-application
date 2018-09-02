import { Action } from '@ngrx/store';
import { GameplayPlayer } from './models/player';

interface EndGamePayload {
	winner: string
}

interface AddPlayerPayload {
	player: GameplayPlayer
}

interface AddPlayersPayload {
	players: GameplayPlayer[]
}

export const START_GAME = 'Start game';
export const END_GAME = 'End game';
export const RESET_GAME = 'Reset game';

export const ADD_PLAYER = 'Add player';
export const ADD_PLAYERS = 'Add players';
export const CHANGE_STEP = 'Change step';

export class StartGame implements Action {
  readonly type = START_GAME;
}

export class EndGame implements Action {
  readonly type = END_GAME;
  constructor(public payload: EndGamePayload) {}
}

export class ResetGame implements Action {
  readonly type = RESET_GAME;
}

export class AddPlayer implements Action {
  readonly type = ADD_PLAYER;
  constructor(public payload: AddPlayerPayload) {}
}

export class AddPlayers implements Action {
  readonly type = ADD_PLAYERS;
  constructor(public payload: AddPlayersPayload) {}
}

export class ChangeStep implements Action {
  readonly type = CHANGE_STEP;
}

export type GameplayActions = StartGame | EndGame | ResetGame | AddPlayer | AddPlayers | ChangeStep;