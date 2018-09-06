import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { BattlefieldFieldComponent } from './field.component';
import { BattlefieldRowComponent } from './row.component';
import { BattlefieldCellComponent } from './cell.component';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import * as fromBattlefieldStore from '../store';

import { BattlefieldAutopassService } from '../services/autopass.service';

class BattlefieldAutopassServiceMock extends BattlefieldAutopassService {
  handler(): void { }
}

describe('BattlefieldComponent', () => {
  let store: Store<AppState>;
  let component: BattlefieldFieldComponent;
  let fixture: ComponentFixture<BattlefieldFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromAppStore.appReducers),
        StoreModule.forFeature('battlefield', fromBattlefieldStore.battlefieldReducers)
      ],
      declarations: [
        BattlefieldFieldComponent,
        BattlefieldRowComponent,
        BattlefieldCellComponent
      ],
      providers: [
        { provide: BattlefieldAutopassService, useClass: BattlefieldAutopassServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should empty form field if game is not started', () => {
    component.field$.subscribe(field => {
      expect(field).toBe(undefined);
    });
  });

  it('should form field after start game', () => {
    const actionStartGame = new gameplayActions.StartGame();

    store.dispatch(actionStartGame);
    fixture.detectChanges();

    component.field$.subscribe(field => {
      expect(field).not.toBe(undefined);
    });
  });

  it('should active autopass handler if set autopass option', () => {
    const spyOnAutopassHandler = spyOn(BattlefieldAutopassServiceMock.prototype, 'handler');

    expect(spyOnAutopassHandler.calls.count()).toBe(0);

    component.autopass = true;
    component.ngOnInit();

    expect(spyOnAutopassHandler.calls.count()).toBe(1);
  });

});
