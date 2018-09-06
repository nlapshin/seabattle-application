import * as fromSelectors from './selectors';
import { GameplayStore } from './models/store';

describe('The gameplay selectors', () => {

  describe('selectGameplayIsBegging', () => {
    it('should return true if gameplay state equal \'\'', () => {
      const store: GameplayStore = {
        state: '',
        step: '',
        players: [],
        winner: ''
      };

      expect(fromSelectors.selectGameplayIsBegging(store)).toBe(true);
    });

    it('should return false if gameplay state not equal \'\'', () => {
      const store: GameplayStore = {
        state: 'started',
        step: '',
        players: [],
        winner: ''
      };

      expect(fromSelectors.selectGameplayIsBegging(store)).toBe(false);
    });
  });

  describe('selectGameplayIsActive', () => {
    it('should return true if gameplay state not equal \'\'', () => {
      const store: GameplayStore = {
        state: 'ended',
        step: '',
        players: [],
        winner: ''
      };

      expect(fromSelectors.selectGameplayIsActive(store)).toBe(true);
    });

    it('should return false if gameplay state equal \'\'', () => {
      const store: GameplayStore = {
        state: '',
        step: '',
        players: [],
        winner: ''
      };

      expect(fromSelectors.selectGameplayIsActive(store)).toBe(false);
    });
  });

  describe('selectGameplayWasEnded', () => {
    it('should return true if gameplay state equal \'ended\'', () => {
      const store: GameplayStore = {
        state: 'ended',
        step: '',
        players: [],
        winner: ''
      };

      expect(fromSelectors.selectGameplayWasEnded(store)).toBe(true);
    });

    it('should return false if gameplay state not equal \'ended\'', () => {
      const store: GameplayStore = {
        state: '',
        step: '',
        players: [],
        winner: ''
      };

      expect(fromSelectors.selectGameplayWasEnded(store)).toBe(false);
    });
  });

  describe('selectGameplayPlayers', () => {
    it('should return list of players', () => {
      const store: GameplayStore = {
        state: '',
        step: '',
        players: [
          { name: 'player1', role: 'player' },
          { name: 'player2', role: 'player' }
        ],
        winner: ''
      };

      expect(fromSelectors.selectGameplayPlayers(store)).toEqual(store.players);
    });
  });

  describe('selectGameplayCheckStep', () => {
    it('should return true if gameplay step equal name of the player to be checked, otherwise false', () => {
      const store: GameplayStore = {
        state: '',
        step: 'player1',
        players: [
          { name: 'player1', role: 'player' },
          { name: 'player2', role: 'player' }
        ],
        winner: ''
      };

      expect(fromSelectors.selectGameplayCheckStep(store, { player: 'player1' })).toBe(true);
      expect(fromSelectors.selectGameplayCheckStep(store, { player: 'player2' })).toBe(false);
      expect(fromSelectors.selectGameplayCheckStep(store, { player: 'player3' })).toBe(false);
    });
  });

  describe('selectGameplayWinner', () => {
    it('should return winner name', () => {
      const store: GameplayStore = {
        state: '',
        step: 'player1',
        players: [
          { name: 'player1', role: 'player' },
          { name: 'player2', role: 'player' }
        ],
        winner: 'player1'
      };

      expect(fromSelectors.selectGameplayWinner(store)).toBe('player1');
    });
  });

});
