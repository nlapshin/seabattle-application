import { GameplayPlayer } from './player';

export interface GameplayStore {
  state: string;
  step: string;
  winner: string;
  players: GameplayPlayer[];
}
