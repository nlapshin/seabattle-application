import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model'; 
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

@Injectable()
export class BattlefieldGuardService {

  constructor(private appStore: Store<AppState>, private battlefieldStore: Store<BattlefieldState>) {
  	this.winnerGuard();
  }

  private winnerGuard() : void {
  	this.battlefieldStore.pipe(select(fromBattlefieldStore.selectFieldWinner)).subscribe(winner => {
  		if (!winner) return;

  		this.appStore.dispatch(new gameplayActions.EndGame({ winner }));
  	});
  }
}