import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

import { ICell } from '../models/cell';

@Component({
  selector: '[app-battlefield-row]',
  templateUrl: './row.component.html',
  styleUrls: ['../battlefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlefieldRowComponent implements OnInit {
  @Input() row: ICell[]
  @Input() player: string
  @Input() disabled: boolean
  @Input() hidden: boolean
  @Input() clickable: boolean

  @HostBinding(`class.battlefield-row`) public elemClass = true 

  constructor() {}

  ngOnInit() { }

  trackByCell(index, cell) {
    return cell.id;
  }
}