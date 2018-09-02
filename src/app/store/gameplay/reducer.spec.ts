import * as fromActions from './actions';
import { gameplayReducer } from './reducer';
import { GameplayStore } from './models/store';

describe('The gameplay reducer', () => {
  it('should return current state when no valid actions have been made', () => {
    const state = <GameplayStore>{ state: "", step: "", players: [], winner: "" };

    const actual = gameplayReducer(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;

    expect(actual).toBe(expected);
  });

  it('should set state "started" when START_GAME is dispatched', () => {
    const state = <GameplayStore>{ state: "", step: "", players: [], winner: "" };

    const actual = gameplayReducer(state, new fromActions.StartGame());
    const expected = <GameplayStore>{state: 'started', step: '', players: [], winner: ""};

    expect(actual).toEqual(expected);
  });

  it('should set step if gameplay store has players when START_GAME is dispatched', () => {
    const state = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	],
    	winner: ""
    };

    const actual = gameplayReducer(state, new fromActions.StartGame());

    expect(actual.state).toEqual("started");
    expect(actual.step).not.toEqual("");
  });

  it('should set state "ended" and set step "" and set winner when END_GAME is dispatched', () => {
    const state = <GameplayStore>{ 
    	state: "started", 
    	step: "player2", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: ""
    };

    const actual = gameplayReducer(state, new fromActions.EndGame({ winner: "player1" }));
    const expected = <GameplayStore>{
    	state: 'ended', 
    	step: '', 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "player1" 
    };

    expect(actual).toEqual(expected);
  });

  it('should reset state, step and winner when RESET_GAME is dispatched', () => {
    const state = <GameplayStore>{ 
    	state: "started", 
    	step: "player2", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "player2" 
    };

    const actual = gameplayReducer(state, new fromActions.ResetGame());
    const expected = <GameplayStore>{
    	state: '', 
    	step: '', 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	],  
    	winner: "" 
    };

    expect(actual).toEqual(expected);
  });

  it('should add player in gameplay store when ADD_PLAYER is dispatched', () => {
    const state1 = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [], 
    	winner: "" 
    };

    const actual1 = gameplayReducer(state1, new fromActions.AddPlayer({ player: { name: "player1", role: "player" } }));
    const expected1 = <GameplayStore>{
    	state: '', 
    	step: '', 
    	players: [ { name: "player1", role: "player" } ], 
    	winner: ""
    };

    expect(actual1).toEqual(expected1);

    const state2 = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [ { name: "player1", role: "player" } ], 
    	winner: "" 
    };

    const actual2 = gameplayReducer(state2, new fromActions.AddPlayer({ player: { name: "player2", role: "player" } }));
    const expected2 = <GameplayStore>{
    	state: '', 
    	step: '', 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: ""
    };

    expect(actual2).toEqual(expected2);

    const state3 = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	],  
    	winner: "" 
    };

    const actual3 = gameplayReducer(state3, new fromActions.AddPlayer({ player: { name: "player2", role: "player" } }));
    const expected3 = <GameplayStore>{
    	state: '', 
    	step: '', 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: ""
    };

    expect(actual3).toEqual(expected3);
  });

  it('should add players in gameplay store when ADD_PLAYERS is dispatched', () => {
    const state1 = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [], 
    	winner: "" 
    };

    const actual1 = gameplayReducer(state1, new fromActions.AddPlayers({ 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	] 
   	}));
    const expected1 = <GameplayStore>{
    	state: '', 
    	step: '', 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: ""
    };

    expect(actual1).toEqual(expected1);

    const state2 = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [ 
    		{ name: "player1", role: "player" } 
    	], 
    	winner: "" 
    };

    const actual2 = gameplayReducer(state2, new fromActions.AddPlayers({ 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	] 
   	}));
    const expected2 = <GameplayStore>{ 
    	state: "", 
    	step: "", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" }
    	], 
    	winner: "" 
    };

    expect(actual2).toEqual(expected2);
  });

  it('should change step in gameplay store when CHANGE_STEP is dispatched', () => {
    const state1 = <GameplayStore>{ 
    	state: "started", 
    	step: "player1", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "" 
    };

    const actual1 = gameplayReducer(state1, new fromActions.ChangeStep());
    const expected1 = <GameplayStore>{ 
    	state: "started", 
    	step: "player2", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "" 
    };

    expect(actual1).toEqual(expected1);

    const state2 = <GameplayStore>{ 
    	state: "started", 
    	step: "player2", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "" 
    };

    const actual2 = gameplayReducer(state2, new fromActions.ChangeStep());
    const expected2 = <GameplayStore>{ 
    	state: "started", 
    	step: "player1", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "" 
    };

    expect(actual2).toEqual(expected2);

    const state3 = <GameplayStore>{ 
    	state: "started", 
    	step: "", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "" 
    };

    const actual3 = gameplayReducer(state3, new fromActions.ChangeStep());
    const expected3 = <GameplayStore>{ 
    	state: "started", 
    	step: "player1", 
    	players: [ 
    		{ name: "player1", role: "player" },
    		{ name: "player2", role: "player" } 
    	], 
    	winner: "" 
    };

    expect(actual3).toEqual(expected3);
  });
});