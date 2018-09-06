import { IShip } from '../models/ship';
import { ICoord } from '../models/coord';

export abstract class Ship implements IShip {
  constructor(public type: string = '', public len: number = 0, public coords: ICoord[] = []) { }

  public getCoords(): ICoord[] {
    return this.coords;
  }

  public fillCoords(xstart: number, ystart: number, rotate: number): void {
    let x: number = xstart;
    let y: number = ystart;

    while (this.len !== this.coords.length) {
      this.coords.push({ x, y });

      const nextRotate: number = this.calcNextCordsRotate(rotate, this.coords.length);
      const nextCoords: { x: number, y: number } = this.calcNextCordsStep(x, y, nextRotate);

      x = nextCoords.x;
      y = nextCoords.y;
    }
  }

  public cleanCoords(): void {
    this.coords.length = 0;
  }

  protected calcNextCordsRotate(rotate: number, step: number) {
    return rotate;
  }

  protected calcNextCordsStep(x: number, y: number, rotate: number) {
    if (rotate === 0 || rotate === 360) {
      return { x: x + 1, y };
    } else if (rotate === 90) {
      return { x: x, y: y + 1 };
    } else if (rotate === 180) {
      return { x: x - 1, y: y };
    } else if (rotate === 270) {
      return { x: x, y: y - 1 };
    }
  }
}
