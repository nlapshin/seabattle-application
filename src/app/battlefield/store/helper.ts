import { transform, flatten, random, shuffle } from 'lodash';

import { ICell, CellStatus } from '../models/cell';
import { ICoord } from '../models/coord';
import { IField } from '../models/field';

import { Field } from '../classes/field';
import { createShip } from '../classes/ships';

export function makeFieldWithRandomLocationShips(size: number = 10, ships: string[]) : IField {
  let fieldInst = new Field(size);

  ships.forEach(stype => {
    let ship = createShip(stype);

    while(true) {
      ship.cleanCoords();

      let { x: xstart, y: ystart } = fieldInst.getRandomFieldCoord();
      let rotateStart = generateRandomRotate();

      ship.fillCoords(xstart, ystart, rotateStart);
      let shipCoords = ship.getCoords();
      
      if(fieldInst.checkCorrectCoords(shipCoords)) {
        fieldInst.addShipToField(shipCoords);

        break;
      };
    };
  });

  return fieldInst.getField();
}

export function selectCell(field: IField, coord: ICoord) : IField {
	return field.map(row => {
    return row.map(cell => {
      if (cell.x === coord.x && cell.y === coord.y) {
        let updateData = {
          status: cell.ship ? CellStatus.DAMAGED : CellStatus.MISSED
        };

        return { ...cell, ...updateData };
      }

      return { ...cell };
    })
  });
}

export function selectRandomFreeCell(field: IField) : IField {
  let freeCells = flatten(field).filter(cell => cell.status === CellStatus.EMPTY);
  let randomCellIndex = random(freeCells.length - 1);

  let freeCell = freeCells[randomCellIndex];

  return selectCell(field, { x: freeCell.x, y: freeCell.y });
}

function generateRandomRotate() : number {
  let rotates = [ 0, 90, 180, 270 ];

  return shuffle(rotates)[random(rotates.length - 1)];
}