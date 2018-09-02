import { flatten, range, random, shuffle } from 'lodash';

import { IField } from '../models/field';
import { ICell } from '../models/cell';
import { ICoord } from '../models/coord';

export class Field {
	private field: IField

	constructor (public size: number = 10) {
		this.field = this.makeField(size);
	}

	public getField() : IField {
		return this.field.slice();
	}

	public getFieldCell(coord: ICoord) : ICell {
		return Object.assign({}, this.field[coord.x][coord.y]);
	}

	public setFieldCell(coord: ICoord, payload: object = {}) : void {
		Object.assign(this.field[coord.x][coord.y], payload);
	}

	public addShipToField(coords: ICoord[] = []) : void {
		coords.forEach(coord => {
			this.setFieldCell(coord, { ship: true });

			let nbCoords = this.getNeighboursCoords(coord);
			nbCoords.forEach(nbCoord => this.setFieldCell(nbCoord, { used: true }));
		});
	}

	public getRange() {
  	return {
  		x: [ 0, this.field.length - 1],
  		y: [ 0, this.field[0].length - 1]
  	}
  }

  public getRandomFieldCoord() : ICoord {
		let fieldRange = this.getRange();

		return {
			x: random.apply(random, fieldRange.x),
			y: random.apply(random, fieldRange.y)
		};
	}

	public coordBelongToField(coord: ICoord) {
		let { x: xrange, y: yrange } = this.getRange();

		return coord.x >= xrange[0] && coord.x <= xrange[1] &&
					 coord.y >= yrange[0] && coord.y <= yrange[1];
	}

	public coordUsedOnField(coord: ICoord) : boolean {
		return this.field[coord.x][coord.y].used;
	}

	public checkCorrectCoords(coords: ICoord[] = []) : boolean {
		return coords.every(coord => this.coordBelongToField(coord) && !this.coordUsedOnField(coord));
	}

	private makeField(size: number = 10) {
  	let sizeArr = range(size);

  	return sizeArr.map(x => sizeArr.map(y => this.defCell(x, y)));
  }

  private defCell(x: number, y: number) : ICell {
  	return <ICell>{ 
			x, 
			y, 
			id: x.toString() + y.toString(), 
			used: false,
			ship: false,
			status: "" 
		};
  }

  private getNeighboursCoords(coord: ICoord) : ICoord[] {
  	let coords = [];

  	let xrange = [ coord.x - 1, coord.x, coord.x + 1 ];
  	let yrange = [ coord.y - 1, coord.y, coord.y + 1 ];

  	xrange.forEach(x => {
  		yrange.forEach(y => {
  			if (this.coordBelongToField({ x, y })) {
  				coords.push({ x, y });
  			}
  		});
  	})

  	return coords;
  }
}