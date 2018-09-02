import { Ship } from './ship';

export function createShip(type: string = "D") {
	switch(type) {
		case "D": return new DShip();
    case "I": return new IShip();
		case "L": return new LShip();
		default: throw new Error("incorrect ship type");
	}
}

export class DShip extends Ship {
	constructor() {
		super("D", 1, []);
	}

	public fillCoords(xstart: number, ystart: number, rotate: number) : void {
		return super.fillCoords(xstart, ystart, 0);
	}
}

export class IShip extends Ship {
	constructor() {
		super("I", 4, []);
	}
}

export class LShip extends Ship {
	constructor() {
		super("L", 4, []);
	}

	protected calcNextCordsRotate(rotate: number, step: number) {
		if (step == (this.len - 1)) {
			return rotate + 90;
		} else {
			return rotate;
		}
	}
}