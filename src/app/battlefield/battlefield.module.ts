import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { BattlefieldComponent } from './battlefield.component';
import { BattlefieldFieldComponent } from './components/field.component';
import { BattlefieldRowComponent } from './components/row.component';
import { BattlefieldCellComponent } from './components/cell.component';

import { battlefieldReducers } from './store';

import { BattlefieldGuardService } from './services/guard.service';
import { BattlefieldAutopassService } from './services/autopass.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('battlefield', battlefieldReducers)
  ],
  declarations: [
    BattlefieldComponent,
    BattlefieldFieldComponent,
    BattlefieldRowComponent,
    BattlefieldCellComponent
  ],
  providers: [
    BattlefieldGuardService,
    BattlefieldAutopassService
  ],
  exports: [
    BattlefieldComponent
  ]
})
export class BattlefieldModule { }
