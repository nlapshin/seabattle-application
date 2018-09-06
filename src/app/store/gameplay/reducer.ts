import { findIndex } from 'lodash';

import * as fromActions from './actions';
import { GameplayStore } from './models/store';

export const initialState: GameplayStore = {
  state: '',
  step: '',
  winner: '',
  players: []
};

export function gameplayReducer(state: GameplayStore = initialState, action) {
  switch (action.type) {
    case fromActions.START_GAME: {
      const data = {
        state: 'started',
        step: state.players.length ? [...state.players][0].name : '',
        winner: ''
      };

      return { ...state, ...data };
    }

    case fromActions.END_GAME: {
      const winner = action.payload.winner;

      const data = { state: 'ended', step: '', winner };
      return { ...state, ...data };
    }

    case fromActions.RESET_GAME: {
      const data = {
        state: '',
        step: '',
        winner: ''
      };

      return { ...state, ...data };
    }

    case fromActions.ADD_PLAYER: {
      const player = action.payload.player;
      const newState = { ...state };

      newState.players = addPlayer(player, newState.players);

      return newState;
    }

    case fromActions.ADD_PLAYERS: {
      const players = action.payload.players;
      const newState = { ...state };

      newState.players = addPlayers(players, newState.players);

      return newState;
    }

    case fromActions.CHANGE_STEP: {
      const curStepIndex = findIndex(state.players, player => player.name === state.step);
      const nextStepIndex = curStepIndex === (state.players.length - 1) ? 0 : (curStepIndex + 1);

      const data = { step: state.players[nextStepIndex].name };

      return { ...state, ...data };
    }
  }

  return state;
}

function addPlayers(newPlayers, oldPlayers) {
  return newPlayers.reduce((players, player) => {
    return addPlayer(player, players);
  }, oldPlayers);
}

function addPlayer(player, players) {
  return players.some(elem => elem.name === player.name) ? players : [...players, player];
}
