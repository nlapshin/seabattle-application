import { Field } from './field';

import { ICell } from '../models/cell';

describe('Field', () => {
  it('should create field instance', () => {
    const field = new Field();

    expect(field).toBeTruthy();
  });

  it('should create field instance with coorected size and cell parameters', () => {
    const fieldInst = new Field(5);
    const field = fieldInst.getField();

    expect(field).toBeTruthy();

    expect(field.length).toEqual(5);
    expect(field[0].length).toEqual(5);

    expect(field[0][0]).toEqual(<ICell>{ id: '00', x: 0, y: 0, ship: false, used: false, status: '' });
    expect(field[4][4]).toEqual(<ICell>{ id: '44', x: 4, y: 4, ship: false, used: false, status: '' });
  });

  describe('getFieldCell', () => {
    it('should return field cell', () => {
      const field = new Field(5);

      const cell = field.getFieldCell({ x: 0, y: 0 });

      expect(cell).toEqual(<ICell>{ x: 0, y: 0, id: '00', used: false, ship: false, status: '' });
    });
  });

  describe('setFieldCell', () => {
    it('should set payload to field cell', () => {
      const field = new Field(5);
      const coord = { x: 0, y: 0 };

      field.setFieldCell(coord, { used: true });
      const cell = field.getFieldCell(coord);

      expect(cell).toEqual(<ICell>{ x: 0, y: 0, id: '00', used: true, ship: false, status: '' });
    });
  });

  describe('addShipToField', () => {
    it('should add ship to field by coords', () => {
      const field = new Field(5);
      const shipCoords = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

      field.addShipToField(shipCoords);

      expect(field.getFieldCell({ x: 0, y: 0 })).toEqual(<ICell>{ x: 0, y: 0, id: '00', used: true, ship: true, status: '' });
      expect(field.getFieldCell({ x: 0, y: 1 })).toEqual(<ICell>{ x: 0, y: 1, id: '01', used: true, ship: true, status: '' });
      expect(field.getFieldCell({ x: 1, y: 1 })).toEqual(<ICell>{ x: 1, y: 1, id: '11', used: true, ship: true, status: '' });

      expect(field.getFieldCell({ x: 0, y: 2 })).toEqual(<ICell>{ x: 0, y: 2, id: '02', used: true, ship: false, status: '' });
      expect(field.getFieldCell({ x: 1, y: 2 })).toEqual(<ICell>{ x: 1, y: 2, id: '12', used: true, ship: false, status: '' });
      expect(field.getFieldCell({ x: 2, y: 2 })).toEqual(<ICell>{ x: 2, y: 2, id: '22', used: true, ship: false, status: '' });
      expect(field.getFieldCell({ x: 2, y: 1 })).toEqual(<ICell>{ x: 2, y: 1, id: '21', used: true, ship: false, status: '' });
      expect(field.getFieldCell({ x: 2, y: 0 })).toEqual(<ICell>{ x: 2, y: 0, id: '20', used: true, ship: false, status: '' });
      expect(field.getFieldCell({ x: 1, y: 0 })).toEqual(<ICell>{ x: 1, y: 0, id: '10', used: true, ship: false, status: '' });
    });
  });

  describe('getRange', () => {
    it('should return field range along the x and y axis', () => {
      const field = new Field(5);

      const range = field.getRange();

      expect(range.x).toEqual([0, 4]);
      expect(range.y).toEqual([0, 4]);
    });
  });

  describe('getRandomFieldCoords', () => {
    it('should return coords within the field with random values', () => {
      const field = new Field(5);

      const coord = field.getRandomFieldCoord();

      expect(field.coordBelongToField(coord)).toBeTruthy();
    });
  });

  describe('coordBelongToField', () => {
    it('should return true if coord belong field and false in the opposite case', () => {
      const field = new Field(5);

      expect(field.coordBelongToField({ x: 0, y: 0 })).toBeTruthy();
      expect(field.coordBelongToField({ x: 2, y: 2 })).toBeTruthy();
      expect(field.coordBelongToField({ x: 0, y: 4 })).toBeTruthy();

      expect(field.coordBelongToField({ x: -1, y: 0 })).toBeFalsy();
      expect(field.coordBelongToField({ x: 0, y: -1 })).toBeFalsy();
      expect(field.coordBelongToField({ x: 5, y: 0 })).toBeFalsy();
      expect(field.coordBelongToField({ x: 0, y: 5 })).toBeFalsy();
    });
  });

  describe('coordUsedOnField', () => {
    it('should return true if coord used in field and false in the opposite case', () => {
      const field = new Field(5);
      const coord = { x: 0, y: 0 };

      expect(field.coordUsedOnField(coord)).toBeFalsy();

      field.setFieldCell(coord, { used: true });
      expect(field.coordUsedOnField(coord)).toBeTruthy();
    });
  });

  describe('checkCoorectCoords', () => {
    it('should return true if all coord correct and they can by used on field and false in the opposite case', () => {
      const field = new Field(5);
      const coords = [{ x: 0, y: 0 }, { x: 1, y: 1 }];

      expect(field.checkCorrectCoords(coords)).toBeTruthy();

      field.setFieldCell({ x: 0, y: 0 }, { used: true });
      expect(field.checkCorrectCoords(coords)).toBeFalsy();
    });
  });

});
