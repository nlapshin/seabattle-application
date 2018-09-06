import { ICoord } from './coord';

export interface IShip {
  type: string;
  coords: ICoord[];
  len: number;
}
