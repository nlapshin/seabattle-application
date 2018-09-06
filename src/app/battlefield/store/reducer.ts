import * as fromActions from './actions';
import * as helper from './helper';
import { FieldState } from './model';

export const initialState: FieldState = {};

export function battlefieldReducer(state: FieldState = initialState, action) {
  switch (action.type) {
    case fromActions.CREATE_FIELD_WITH_RANDOM_SHIPS: {
      const { name, size, ships } = action.payload;

      const field = {
        [name]: helper.makeFieldWithRandomLocationShips(size, ships)
      };

      return { ...state, ...field };
    }

    case fromActions.SELECT_FIELD_CELL: {
      const { name, coord } = action.payload;

      const updateField = {
        [name]: helper.selectCell(state[name], coord)
      };

      return { ...state, ...updateField };
    }

    case fromActions.SELECT_RANDOM_FREE_FIELD_CELL: {
      const { name } = action.payload;

      const updateField = {
        [name]: helper.selectRandomFreeCell(state[name])
      };

      return { ...state, ...updateField };
    }
  }

  return state;
}
