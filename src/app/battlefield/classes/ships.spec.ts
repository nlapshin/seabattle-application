import { createShip, DShip, IShip, LShip } from './ships';

describe('DShip', () => {
  it('should create dship', () => {
    const dship = new DShip();

    expect(dship).toBeTruthy();
  });

  describe('fillCoords', () => {
    describe('should fill coordinates of ship', () => {
      it('x = 0, y = 0', () => {
        const dship = new DShip();

        dship.fillCoords(0, 0, 0);
        expect(dship.coords).toEqual([{ x: 0, y: 0 }]);
      });
    });
  });
});

describe('IShip', () => {
  it('should create dship', () => {
    const iship = new IShip();

    expect(iship).toBeTruthy();
  });

  describe('fillCoords', () => {
    describe('should fill coordinates of ship', () => {
      it('x = 0, y = 0, rotate = 0', () => {
        const iship = new IShip();

        iship.fillCoords(0, 0, 0);
        expect(iship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]);
      });

      it('x = 0, y = 0, rotate = 90', () => {
        const iship = new IShip();

        iship.fillCoords(0, 0, 90);
        expect(iship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]);
      });

      it('x = 0, y = 0, rotate = 180', () => {
        const iship = new IShip();

        iship.fillCoords(0, 0, 180);
        expect(iship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }]);
      });

      it('x = 0, y = 0, rotate = 270', () => {
        const iship = new IShip();

        iship.fillCoords(0, 0, 270);
        expect(iship.getCoords()).toEqual([{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }]);
      });
    });
  });
});

describe('LShip', () => {
  it('should create lship', () => {
    const lship = new LShip();

    expect(lship).toBeTruthy();
  });

  describe('fillCoords', () => {
    describe('should fiil coordinates of ship', () => {
      it('x = 0, y = 0, rotate = 0', () => {
        const lship = new LShip();

        lship.fillCoords(0, 0, 0);
        expect(lship.coords).toEqual([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }]);
      });

      it('x = 0, y = 0, rotate = 90', () => {
        const lship = new LShip();

        lship.fillCoords(0, 0, 90);
        expect(lship.coords).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 2 }]);
      });

      it('x = 0, y = 0, rotate = 180', () => {
        const lship = new LShip();

        lship.fillCoords(0, 0, 180);
        expect(lship.coords).toEqual([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }, { x: -2, y: -1 }]);
      });

      it('x = 0, y = 0, rotate = 270', () => {
        const lship = new LShip();

        lship.fillCoords(0, 0, 270);
        expect(lship.coords).toEqual([{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 1, y: -2 }]);
      });
    });
  });
});

describe('createShip', () => {
  it('should create ship by type', () => {
    const dship = createShip('D');
    const iship = createShip('I');
    const lship = createShip('L');

    expect(dship.type).toEqual('D');
    expect(iship.type).toEqual('I');
    expect(lship.type).toEqual('L');
    // expect(function(){ createShip("TTTT") }).toThrow(new Error("incorrect ship types"));
  });
});
