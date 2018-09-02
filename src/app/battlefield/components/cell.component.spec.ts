import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { ICell, CellStatus } from '../models/cell';
import { BattlefieldCellComponent } from './cell.component';


import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model'; 
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

describe('BattlefieldComponent', () => {
  let cellElem;
  let component: BattlefieldCellComponent;
  let fixture: ComponentFixture<BattlefieldCellComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    	imports: [
    		StoreModule.forRoot(fromAppStore.appReducers),
    		StoreModule.forFeature('battlefield', fromBattlefieldStore.battlefieldReducers)
    	],
      declarations: [ 
        BattlefieldCellComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldCellComponent);
    component = fixture.componentInstance;
    cellElem = fixture.nativeElement;
    fixture.detectChanges();

    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should correct cell classes after pass cell data', () => {

  	it("init", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY };
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell');
  	});
  	
  	it("clickable", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY };
  		component.clickable = true;
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell battlefield-cell--clickable');
  	});

  	it("disabled", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY };
  		component.clickable = true;
  		component.disabled = true;
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell');
  	})

  	it("ship", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.EMPTY };
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell battlefield-cell--ship');
  	});

  	it("missed", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.MISSED };
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell battlefield-cell--missed');
  	});
  	
  	it("damaged", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.DAMAGED };
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell battlefield-cell--damaged');
  	});

  	it("clickable with ship", () => {
  		component.cell = { id: "00", x: 0, y: 0, ship: true, used: true, status: CellStatus.EMPTY };
  		component.clickable = true;
  		fixture.detectChanges();

  		expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-cell battlefield-cell--clickable battlefield-cell--ship');
  	});
  });

  describe('should correctly execute the handler on a click on a cell', () => {

    it("should call dispatch actions if cell is empty and clickable", () => {
      let storeSpy = spyOn(store, 'dispatch').and.callFake(() => {});

      component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY };
      component.player = "enemy";
      component.clickable = true;
      component.disabled = false;

      cellElem.click();

      expect(storeSpy.calls.count()).toBe(2);

      expect(store.dispatch).toHaveBeenCalledWith(new battlefieldActions.SelectFieldCell({ 
        name: component.player,
        coord: { 
          x: component.cell.x,
          y: component.cell.y
        }
      }));

      expect(store.dispatch).toHaveBeenCalledWith(new gameplayActions.ChangeStep());
    });

    it("should not call dispatch actions if cell is not clickable", () => {
      let storeSpy = spyOn(store, 'dispatch').and.callFake(() => {});

      component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY };
      component.player = "enemy";
      component.clickable = false;
      component.disabled = false;

      cellElem.click();

      expect(storeSpy.calls.count()).toBe(0);
    });

    it("should not call dispatch actions if cell is disabled", () => {
      let storeSpy = spyOn(store, 'dispatch').and.callFake(() => {});

      component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY };
      component.player = "enemy";
      component.clickable = true;
      component.disabled = true;

      cellElem.click();

      expect(storeSpy.calls.count()).toBe(0);
    });

    it("should not call dispatch actions if cell is not empty", () => {
      let storeSpy = spyOn(store, 'dispatch').and.callFake(() => {});

      component.cell = { id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.MISSED };
      component.player = "enemy";
      component.clickable = true;
      component.disabled = false;

      cellElem.click();

      expect(storeSpy.calls.count()).toBe(0);
    });
  });
});
