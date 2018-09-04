import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../store/model';
import * as fromAppStore from '../store';
import { GameplayPlayer } from '../store/gameplay/models/player';
import * as gameplayActions from '../store/gameplay/actions';

import { BattlefieldState } from './store/model';
import * as fromBattlefieldStore from './store';
import * as battlefieldActions from './store/actions';

import { BattlefieldGuardService } from './services/guard.service';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {
  @Input() player: string
  @Input() opponent: string

  public size: number = 10
  public ships: string[] = ["D", "D", "L", "I"]

  public players$: Observable<any>
  public disabled$: Observable<boolean>

  constructor(
    private appStore: Store<AppState>,
    private battlefieldStore: Store<BattlefieldState>,
    private BattlefieldGuardService: BattlefieldGuardService) { }

  ngOnInit() {
    this.players$ = this.appStore.pipe(select(fromAppStore.selectGameplayPlayers), map(this.mapPlayers.bind(this)));
    this.disabled$ = this.appStore.pipe(select(fromAppStore.selectGameplayWasEnded));
  }

  mapPlayers(players: GameplayPlayer[]) {
    return players.map((player, index) => {
      let name = player.name;
      let isEnemy = player.role === "computer";

      let opponent = players.find(elem => elem.name !== player.name);

      return {
        name: name,
        opponent: opponent ? opponent.name : "",
        autopass: isEnemy,
        hidden: isEnemy,
        clickable: isEnemy
      }
    });
  }
}
