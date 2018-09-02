import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { appReducers } from '../store';
import { battlefieldReducers } from './store';

import { BattlefieldComponent } from './battlefield.component';
import { BattlefieldFieldComponent } from './components/field.component';
import { BattlefieldRowComponent } from './components/row.component';
import { BattlefieldCellComponent } from './components/cell.component';

import { AppState } from '../store/model';
import * as fromAppStore from '../store';
import * as gameplayActions from '../store/gameplay/actions';

import { BattlefieldState } from './store/model'; 
import * as fromBattlefieldStore from './store';
import * as battlefieldActions from './store/actions';

import { BattlefieldGuardService } from './services/guard.service';

describe('BattlefieldComponent', () => {
  let component: BattlefieldComponent;
  let fixture: ComponentFixture<BattlefieldComponent>;
  let appStore: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    	imports: [
    		StoreModule.forRoot(appReducers),
    		StoreModule.forFeature('battlefield', battlefieldReducers)
    	],
      declarations: [ 
        BattlefieldComponent,
        BattlefieldFieldComponent,
        BattlefieldRowComponent,
        BattlefieldCellComponent
      ],
      providers: [
        BattlefieldGuardService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  	appStore = TestBed.get(Store);

    spyOn(appStore, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(BattlefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a player fields after the players is dispatched', () => {
    const players = [
    	{ name: "player", role: "player" },
    	{ name: "enemy", role: "computer" }
    ];
    const action = new gameplayActions.AddPlayers({ players });

    appStore.dispatch(action);

    let expected = [
    	{
    		"name": "player",
	    	"opponent": "enemy",
	    	"autopass": false,
	    	"hidden": false,
	    	"clickable": false
    	},
    	{
    		"name": "enemy",
	    	"opponent": "player",
	    	"autopass": true,
	    	"hidden": true,
	    	"clickable": true
    	}
    ];

    component.players$.subscribe(outPlayers => {
      expect(outPlayers).toEqual(expected);
    });
  });
});