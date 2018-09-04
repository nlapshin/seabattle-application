import { Ship } from './ship';

let TShip = class TShip extends Ship { };

describe('Ship', () => {
  it("should create ship instance", () => {
    let ship = new TShip();

    expect(ship).toBeTruthy();
  });

  describe("fillCoords", () => {
    describe("should fill coordinates of ship", () => {
      it("x = 0, y = 0, rotate = 0", () => {
        let ship = new TShip("T", 4);

        ship.fillCoords(0, 0, 0);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]);
      });

      it("x = 0, y = 0, rotate = 90", () => {
        let ship = new TShip("T", 4);

        ship.fillCoords(0, 0, 90);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]);
      });

      it("x = 0, y = 0, rotate = 180", () => {
        let ship = new TShip("T", 4);

        ship.fillCoords(0, 0, 180);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }]);
      });

      it("x = 0, y = 0, rotate = 270", () => {
        let ship = new TShip("T", 4);

        ship.fillCoords(0, 0, 270);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }]);
      });
    });
  });
});
