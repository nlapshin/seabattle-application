import { flatten } from 'lodash';

import * as helper from './helper';

import { ICell, CellStatus } from '../models/cell';

describe('The field helper', () => {
  describe('makeFieldWithRandomLocationShips', () => {
    it('should make field with random ships', () => {
      const ships = ['D'];
      const size = 3;

      const field = helper.makeFieldWithRandomLocationShips(size, ships);

      expect(field.length).toEqual(3);
      expect(field[0].length).toEqual(3);

      const outShips = flatten(field).filter(cell => cell.ship);

      expect(outShips.length).toEqual(1);
    });
  });

  describe('selectCell', () => {
    it('should set field set status by coord', () => {
      const coord1 = { x: 0, y: 0 };
      const coord2 = { x: 1, y: 0 };

      const field = [
        [
          <ICell>{ id: '00', x: 0, y: 0, used: false, ship: false, status: CellStatus.EMPTY },
          <ICell>{ id: '01', x: 1, y: 0, used: true, ship: true, status: CellStatus.EMPTY }
        ]
      ];

      const newField1 = helper.selectCell(field, coord1);
      const newField2 = helper.selectCell(field, coord2);

      expect(newField1[0][0].status).toBe(CellStatus.MISSED);
      expect(newField2[0][1].status).toBe(CellStatus.DAMAGED);
    });
  });

  describe('selectRandomFreeCell', () => {
    it('should return free cell', () => {
      const field = [
        [
          <ICell>{ id: '00', x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY },
          <ICell>{ id: '01', x: 0, y: 1, ship: false, used: false, status: CellStatus.MISSED },
          <ICell>{ id: '02', x: 0, y: 2, ship: false, used: false, status: CellStatus.DAMAGED },
          <ICell>{ id: '03', x: 0, y: 2, ship: false, used: false, status: CellStatus.EMPTY }
        ]
      ];

      const newField = helper.selectRandomFreeCell(field);
      expect([newField[0][0].status, newField[0][3].status]).toContain(CellStatus.MISSED);
    });
  });
});
