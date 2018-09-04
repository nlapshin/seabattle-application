export enum CellStatus {
  DAMAGED = "damaged",
  MISSED = "missed",
  EMPTY = ""
}

export interface ICell {
  id: string,
  x: number,
  y: number,
  ship: boolean,
  used: boolean,
  status: CellStatus
}
