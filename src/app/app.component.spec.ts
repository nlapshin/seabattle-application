import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { BattlefieldModule } from './battlefield/battlefield.module';

import { appReducers } from './store';
import { AppComponent } from './app.component';

import { AppState } from './store/model';
import * as fromAppStore from './store';
import * as gameplayActions from './store/gameplay/actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appStore: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        BattlefieldModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    appStore = TestBed.get(Store);

    spyOn(appStore, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should show create game button after start component', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      const navButtons = element.querySelectorAll('.app__nav-button');
      const gameContainerActive = element.querySelectorAll('.app__game-container--active');

      expect(navButtons.length).toBe(1);
      expect(navButtons[0].innerText).toBe('Начать игру');
      expect(gameContainerActive.length).toBe(0);
    });
  }));

  it('should show game field after start game and add button restart game', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.startGame();

      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      const navButtons = element.querySelectorAll('.app__nav-button');
      const gameContainerActive = element.querySelectorAll('.app__game-container--active');

      expect(navButtons.length).toBe(1);
      expect(navButtons[0].innerText).toBe('Перезапустить игру');
      expect(gameContainerActive.length).toBe(1);
    });
  }));

  it('should show game field after restart game and add button restart game', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.startGame();
      fixture.detectChanges();

      component.restartGame();
      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      const navButtons = element.querySelectorAll('.app__nav-button');
      const gameContainerActive = element.querySelectorAll('.app__game-container--active');

      expect(navButtons.length).toBe(1);
      expect(navButtons[0].innerText).toBe('Перезапустить игру');
      expect(gameContainerActive.length).toBe(1);
    });
  }));

  it('should show button start game again and show winner after game is over', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const actionPlayerWin = new gameplayActions.EndGame({ winner: component.player });

      appStore.dispatch(actionPlayerWin);
      fixture.detectChanges();

      let element = fixture.debugElement.nativeElement;
      let navButtons = element.querySelectorAll('.app__nav-button');
      let resultContainer = element.querySelector('.app__result');
      let gameContainerActive = element.querySelectorAll('.app__game-container--active');

      expect(navButtons.length).toBe(1);
      expect(navButtons[0].innerText).toBe('Начать игру заново');
      expect(gameContainerActive.length).toBe(1);
      expect(resultContainer.innerText).toBe('Игра окончена. Вы выиграли.');

      const actionPlayerLose = new gameplayActions.EndGame({ winner: component.opponent });

      appStore.dispatch(actionPlayerLose);
      fixture.detectChanges();

      element = fixture.debugElement.nativeElement;
      navButtons = element.querySelectorAll('.app__nav-button');
      resultContainer = element.querySelector('.app__result');
      gameContainerActive = element.querySelectorAll('.app__game-container--active');

      expect(navButtons.length).toBe(1);
      expect(navButtons[0].innerText).toBe('Начать игру заново');
      expect(gameContainerActive.length).toBe(1);
      expect(resultContainer.innerText).toBe('Игра окончена. Вы проиграли.');
    });
  }));
});
