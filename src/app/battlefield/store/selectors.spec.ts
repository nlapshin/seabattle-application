import * as fromSelectors from './selectors';
import { FieldState } from './model';

import { ICell, CellStatus } from '../models/cell';

describe('The field selectors', () => {

  describe("selectFieldList", () => {
    it("should return field list by player name", () => {
      const state = <FieldState>{
        "player": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY },
            <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: CellStatus.EMPTY }
          ]
        ],
        "enemy": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY },
            <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: CellStatus.EMPTY }
          ]
        ]
      };

      const expectedPlayer = [
        [
          <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY },
          <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: CellStatus.EMPTY }
        ]
      ];

      const expectedEnemy = [
        [
          <ICell>{ id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY },
          <ICell>{ id: "01", x: 0, y: 1, ship: false, used: false, status: CellStatus.EMPTY }
        ]
      ]

      expect(fromSelectors.selectFieldList(state, "player")).toEqual(expectedPlayer);
      expect(fromSelectors.selectFieldList(state, "enemy")).toEqual(expectedEnemy);
    });
  });

  describe("selectFieldWinner", () => {
    it("should return winners name if there is one", () => {
      const state1 = <FieldState>{
        "player": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.EMPTY },
            <ICell>{ id: "01", x: 0, y: 1, ship: true, used: true, status: CellStatus.DAMAGED },
            <ICell>{ id: "02", x: 0, y: 2, ship: false, used: true, status: CellStatus.MISSED }
          ]
        ],
        "enemy": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.EMPTY },
            <ICell>{ id: "01", x: 0, y: 1, ship: true, used: true, status: CellStatus.DAMAGED },
            <ICell>{ id: "02", x: 0, y: 2, ship: false, used: true, status: CellStatus.EMPTY }
          ]
        ]
      };

      const nowinner = fromSelectors.selectFieldWinner(state1);
      expect(nowinner).toBe("");

      const state2 = <FieldState>{
        "player": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.DAMAGED },
            <ICell>{ id: "01", x: 0, y: 1, ship: true, used: true, status: CellStatus.DAMAGED },
            <ICell>{ id: "02", x: 0, y: 2, ship: false, used: false, status: CellStatus.EMPTY }
          ]
        ],
        "enemy": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: true, used: false, status: CellStatus.EMPTY },
            <ICell>{ id: "01", x: 0, y: 1, ship: true, used: false, status: CellStatus.DAMAGED },
            <ICell>{ id: "02", x: 0, y: 2, ship: false, used: true, status: CellStatus.EMPTY }
          ]
        ]
      };

      const winnerEnemy = fromSelectors.selectFieldWinner(state2);
      expect(winnerEnemy).toBe("enemy");

      const state3 = <FieldState>{
        "player": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: true, used: false, status: CellStatus.EMPTY },
            <ICell>{ id: "01", x: 0, y: 1, ship: true, used: true, status: CellStatus.EMPTY },
            <ICell>{ id: "02", x: 0, y: 2, ship: false, used: false, status: CellStatus.EMPTY }
          ]
        ],
        "enemy": [
          [
            <ICell>{ id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.DAMAGED },
            <ICell>{ id: "01", x: 0, y: 1, ship: true, used: true, status: CellStatus.DAMAGED },
            <ICell>{ id: "02", x: 0, y: 2, ship: false, used: false, status: CellStatus.EMPTY }
          ]
        ]
      };

      const winnerPlayer = fromSelectors.selectFieldWinner(state3);
      expect(winnerPlayer).toBe("player");
    });
  });
});
