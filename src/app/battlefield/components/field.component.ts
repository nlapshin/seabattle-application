import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap, filter, take, tap } from 'rxjs/operators';

import { IField } from '../models/field';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

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
  @Input() size: number = 10
  @Input() ships: string[] = []
  @Input() player: string
  @Input() opponent: string
  @Input() disabled: boolean = false
  @Input() autopass: boolean = false
  @Input() hidden: boolean = false
  @Input() clickable: boolean = false

  public field$: Observable<IField>

  constructor(
    private appStore: Store<AppState>, 
    private battlefieldStore: Store<BattlefieldState>, 
    private BattlefieldAutopassService: BattlefieldAutopassService
  ) {

  }

  ngOnInit() {
    this.appStore.pipe(select(fromAppStore.selectGameplayWasStarted)).subscribe((started) => {
      if (started === false) return;

      this.battlefieldStore.dispatch(new battlefieldActions.CreateFieldWithRandomShips({ 
        name: this.player, 
        size: this.size, 
        ships: this.ships
      }));
    });

    this.field$ = this.battlefieldStore.pipe(select(fromBattlefieldStore.selectFieldList, this.player));

    if (this.autopass) {
      this.BattlefieldAutopassService.handler(this.player, this.opponent);
    }
  }

  trackByRow(index, row) {
    return index;
  }
}