import { Ship } from './ship';

const TShipClass = class TShip extends Ship { };

describe('Ship', () => {
  it('should create ship instance', () => {
    const ship = new TShipClass();

    expect(ship).toBeTruthy();
  });

  describe('fillCoords', () => {
    describe('should fill coordinates of ship', () => {
      it('x = 0, y = 0, rotate = 0', () => {
        const ship = new TShipClass('T', 4);

        ship.fillCoords(0, 0, 0);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]);
      });

      it('x = 0, y = 0, rotate = 90', () => {
        const ship = new TShipClass('T', 4);

        ship.fillCoords(0, 0, 90);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]);
      });

      it('x = 0, y = 0, rotate = 180', () => {
        const ship = new TShipClass('T', 4);

        ship.fillCoords(0, 0, 180);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }]);
      });

      it('x = 0, y = 0, rotate = 270', () => {
        const ship = new TShipClass('T', 4);

        ship.fillCoords(0, 0, 270);
        expect(ship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }]);
      });
    });
  });
});
