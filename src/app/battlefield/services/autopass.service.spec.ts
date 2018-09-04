import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { of } from 'rxjs';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model';
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

import { BattlefieldAutopassService } from './autopass.service';

describe('BattlefieldAutopassService', () => {
  let store: Store<AppState>;
  let service: BattlefieldAutopassService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromAppStore.appReducers),
        StoreModule.forFeature('battlefield', fromBattlefieldStore.battlefieldReducers)
      ],
      providers: [BattlefieldAutopassService]
    });
  });

  beforeEach(inject([BattlefieldAutopassService], (serv: BattlefieldAutopassService) => {
    service = serv;
    store = TestBed.get(Store);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handler', () => {
    it('should autopass  if now players ste', () => {
      let storeSpy = spyOn(store, 'dispatch').and.callFake(() => { });
      spyOn(fromAppStore, 'selectGameplayCheckStep').and.returnValue(true);

      service.handler("player", "opponent");

      expect(storeSpy.calls.count()).toBe(2);

      expect(store.dispatch).toHaveBeenCalledWith(new battlefieldActions.SelectRandomFreeFieldCell({
        name: "opponent"
      }));

      expect(store.dispatch).toHaveBeenCalledWith(new gameplayActions.ChangeStep());
    });

    it('should no autopass if now not players step', () => {
      let storeSpy = spyOn(store, 'dispatch').and.callFake(() => { });
      spyOn(fromAppStore, 'selectGameplayCheckStep').and.returnValue(false);

      service.handler("player", "opponent");

      expect(storeSpy.calls.count()).toBe(0);
    });
  })
});
