import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import * as fromBattlefieldStore from '../store';

import { BattlefieldGuardService } from './guard.service';

describe('BattlefieldGuardService', () => {
  let appStore: Store<AppState>;

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
    spyOn(fromBattlefieldStore, 'selectFieldWinner').and.callFake(() => 'winner');
  });

  it('should be created', inject([BattlefieldGuardService], (service: BattlefieldGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should update gameplay winner after end battlefield game', inject([BattlefieldGuardService], () => {
    expect(appStore.dispatch).toHaveBeenCalledWith(new gameplayActions.EndGame({ winner: 'winner' }));
  }));
});
