import * as fromActions from './actions';
import { battlefieldReducer } from './reducer';
import { FieldState } from './model';

import { ICell } from '../models/cell';

describe('The field reducer', () => {
  it('should return add field with random ships into store when CREATE_FIELD_WITH_RANDOM_SHIPS is dispatched', () => {
    const state = <FieldState>{ };

    const actual = battlefieldReducer(state, new fromActions.CreateFieldWithRandomShips({ 
      name: "player", size: 10, ships: [ "D", "L", "I" ]
    }));

    expect(actual["player"]).toBeDefined();
  });

  it('should update cell for current player', () => {
    const state = <FieldState>{ 
      "player": [
        [ 
          <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: "" },
          <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: "" }
        ]
      ],
      "enemy": [
        [ 
          <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: "" },
          <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: "" }
        ]
      ]
    };

    const actual = battlefieldReducer(state, new fromActions.SelectFieldCell({ 
      name: "player", coord: { x: 0, y: 0 }
    }));

    const expected = <FieldState>{ 
      "player": [
        [ 
          <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: "missed" },
          <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: "" }
        ]
      ],
      "enemy": [
        [ 
          <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: "" },
          <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: "" }
        ]
      ]
    };

    expect(actual).toEqual(expected);
  });
});