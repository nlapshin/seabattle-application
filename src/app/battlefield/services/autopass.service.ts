import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, filter, take, tap } from 'rxjs/operators';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model';
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

@Injectable()
export class BattlefieldAutopassService {

  constructor(private appStore: Store<AppState>, private battlefieldStore: Store<BattlefieldState>) { }

  public handler(player: string, opponent: string): void {
    let currentPlayerStep$ = this.appStore.pipe(
      select(fromAppStore.selectGameplayCheckStep, { player }),
      filter(res => res === true)
    );

    currentPlayerStep$.subscribe(() => {
      this.battlefieldStore.dispatch(new battlefieldActions.SelectRandomFreeFieldCell({
        name: opponent
      }));

      this.appStore.dispatch(new gameplayActions.ChangeStep());
    });
  }
}
