import { GameplayStore } from './models/store';

interface gameplayCheckStep {
	player: string
}

export const selectGameplayIsBegging = (store: GameplayStore) => store.state === '';
export const selectGameplayIsActive = (store: GameplayStore) => store.state !== '';

export const selectGameplayWasStarted = (store: GameplayStore) => store.state === 'started';
export const selectGameplayWasEnded = (store: GameplayStore) => store.state === 'ended';

export const selectGameplayPlayers = (store: GameplayStore) => store.players;
export const selectGameplayCheckStep = (store: GameplayStore, payload: gameplayCheckStep) => store.step === payload.player;

export const selectGameplayWinner = (store: GameplayStore) => store.winner;