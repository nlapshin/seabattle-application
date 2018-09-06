import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { BattlefieldRowComponent } from './row.component';
import { BattlefieldCellComponent } from './cell.component';

import { CellStatus } from '../models/cell';

import * as fromAppStore from '../../store';
import * as fromBattlefieldStore from '../store';

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
    }).compileComponents();
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

    it('init', () => {
      component.row = [{ id: '00', x: 0, y: 0, ship: false, used: false, status: CellStatus.EMPTY }];
      fixture.detectChanges();

      expect(fixture.nativeElement.getAttribute('class')).toBe('battlefield-row');
    });
  });

});
