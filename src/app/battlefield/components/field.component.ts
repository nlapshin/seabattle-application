import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IField } from '../models/field';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';

import { BattlefieldState } from '../store/model';
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

import { BattlefieldAutopassService } from '../services/autopass.service';

@Component({
  selector: 'app-battlefield-field',
  templateUrl: './field.component.html',
  styleUrls: ['../battlefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlefieldFieldComponent implements OnInit {
  @Input() size = 10;
  @Input() ships: string[] = [];
  @Input() player: string;
  @Input() opponent: string;
  @Input() disabled = false;
  @Input() autopass = false;
  @Input() hidden = false;
  @Input() clickable = false;

  public field$: Observable<IField>;

  constructor(
    private appStore: Store<AppState>,
    private battlefieldStore: Store<BattlefieldState>,
    private battlefieldAutopassService: BattlefieldAutopassService
  ) {

  }

  ngOnInit() {
    this.appStore.pipe(select(fromAppStore.selectGameplayWasStarted)).subscribe((started) => {
      if (started === false) { return; }

      this.battlefieldStore.dispatch(new battlefieldActions.CreateFieldWithRandomShips({
        name: this.player,
        size: this.size,
        ships: this.ships
      }));
    });

    this.field$ = this.battlefieldStore.pipe(select(fromBattlefieldStore.selectFieldList, this.player));

    if (this.autopass) {
      this.battlefieldAutopassService.handler(this.player, this.opponent);
    }
  }

  trackByRow(index) {
    return index;
  }
}
