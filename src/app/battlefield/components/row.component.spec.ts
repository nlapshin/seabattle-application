import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { BattlefieldRowComponent } from './row.component';
import { BattlefieldCellComponent } from './cell.component';

import { ICell, CellStatus } from '../models/cell';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model'; 
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

describe('BattlefieldComponent', () => {
  let component: BattlefieldRowComponent;
  let fixture: ComponentFixture<BattlefieldRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    	imports: [
    		StoreModule.forRoot(fromAppStore.appReducers),
    		StoreModule.forFeature('battlefield', fromBattlefieldStore.battlefieldReducers)
    	],
      declarations: [ 
        BattlefieldRowComponent,
        BattlefieldCellComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should correct row classes after pass row data', () => {

    it("init", () => {
      component.row = [{ id: "00", x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY }];
      fixture.detectChanges();

      expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-row');
    });
  });

});
