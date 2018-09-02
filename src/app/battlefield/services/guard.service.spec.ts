import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model'; 
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

import { BattlefieldGuardService } from './guard.service';

describe('BattlefieldGuardService', () => {
  let appStore: Store<AppState>;
  let selectFieldWinnerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [
    		StoreModule.forRoot(fromAppStore.appReducers),
    		StoreModule.forFeature('battlefield', fromBattlefieldStore.battlefieldReducers)
    	],
      providers: [BattlefieldGuardService]
    });
  });

  beforeEach(() => {
    appStore = TestBed.get(Store);

    spyOn(appStore, 'dispatch').and.callThrough();
    spyOn(fromBattlefieldStore, 'selectFieldWinner').and.callFake(() => "winner");
  });

  it('should be created', inject([BattlefieldGuardService], (service: BattlefieldGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should update gameplay winner after end battlefield game', inject([BattlefieldGuardService], (service: BattlefieldGuardService) => {
    expect(appStore.dispatch).toHaveBeenCalledWith(new gameplayActions.EndGame({ winner: "winner" }));
  }));
});
