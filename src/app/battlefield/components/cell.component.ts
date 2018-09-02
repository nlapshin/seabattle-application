import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ICell, CellStatus } from '../models/cell';

import { AppState } from '../../store/model';
import * as fromAppStore from '../../store';
import * as gameplayActions from '../../store/gameplay/actions';

import { BattlefieldState } from '../store/model'; 
import * as fromBattlefieldStore from '../store';
import * as battlefieldActions from '../store/actions';

const CLASS_ELEM = "battlefield-cell"
const CLASS_CLICKABLE = `${CLASS_ELEM}--clickable`;
const CLASS_HIDDEN = `${CLASS_ELEM}--hidden`;
const CLASS_SHIP = `${CLASS_ELEM}--ship`;
const CLASS_MISSED = `${CLASS_ELEM}--missed`;
const CLASS_DAMAGED = `${CLASS_ELEM}--damaged`;

@Component({
  selector: '[app-battlefield-cell]',
  templateUrl: './cell.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlefieldCellComponent implements OnInit {
  @Input() cell: ICell = { id: "", x: -1, y: -1, ship: false, used: false, status: CellStatus.EMPTY }
  @Input() player: string
  @Input() disabled: boolean
  @Input() hidden: boolean
	@Input() clickable: boolean

  @HostBinding(`class.${CLASS_ELEM}`) public elemClass = true 

  @HostBinding(`class.${CLASS_CLICKABLE}`) 
	public get isClickable(): boolean {
		return !this.disabled && this.clickable && this.cell.status === CellStatus.EMPTY;
	}

	@HostBinding(`class.${CLASS_HIDDEN}`) 
	public get isHidden(): boolean {
		return this.hidden && this.cell.status === "";
	}

	@HostBinding(`class.${CLASS_SHIP}`) 
	public get isShip(): boolean {
		return !this.hidden && this.cell.ship === true && this.cell.status === CellStatus.EMPTY;
	}

	@HostBinding(`class.${CLASS_MISSED}`) 
	public get isMissed(): boolean {
		return this.cell.status === CellStatus.MISSED;
	}

	@HostBinding(`class.${CLASS_DAMAGED}`) 
	public get isDamaged(): boolean {
		return this.cell.status === CellStatus.DAMAGED;
	}

	@HostListener('click') onClickCell() {
		if (!this.clickable || this.disabled) return;
		if (this.cell.status !== CellStatus.EMPTY) return;

		this.battlefieldStore.dispatch(new battlefieldActions.SelectFieldCell({ 
      name: this.player,
      coord: {
      	x: this.cell.x,
      	y: this.cell.y
      }
    }));

    this.appStore.dispatch(new gameplayActions.ChangeStep());
	}

  constructor(private appStore: Store<AppState>, private battlefieldStore: Store<BattlefieldState>) {

  }

  ngOnInit() {}
}