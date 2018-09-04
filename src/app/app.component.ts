import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from './store/model';
import * as fromStore from './store';
import * as gameplayActions from './store/gameplay/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public player: string = "player"
  public opponent: string = "enemy"

  public isBegging$: Observable<boolean>
  public isActive$: Observable<boolean>

  public wasStarted$: Observable<boolean>
  public wasEnded$: Observable<boolean>

  public resultMessage$: Observable<string>

  constructor(private appStore: Store<AppState>) { }

  ngOnInit() {
    this.isBegging$ = this.appStore.pipe(select(fromStore.selectGameplayIsBegging));
    this.isActive$ = this.appStore.pipe(select(fromStore.selectGameplayIsActive));

    this.wasStarted$ = this.appStore.pipe(select(fromStore.selectGameplayWasStarted));
    this.wasEnded$ = this.appStore.pipe(select(fromStore.selectGameplayWasEnded));

    this.resultMessage$ = this.appStore.pipe(
      select(fromStore.selectGameplayWinner),
      map(this.prepareResultMessage.bind(this))
    );
  }

  startGame(): void {
    this.appStore.dispatch(new gameplayActions.AddPlayers({
      players: [
        { name: this.player, role: "player" },
        { name: this.opponent, role: "computer" }
      ]
    }));

    this.appStore.dispatch(new gameplayActions.StartGame());
  }

  restartGame(): void {
    this.appStore.dispatch(new gameplayActions.ResetGame());
    this.appStore.dispatch(new gameplayActions.StartGame());
  }

  prepareResultMessage(winner: string): string {
    if (winner === "") {
      return winner;
    };

    let result = "Игра окончена. ";
    result += (winner === this.player) ? "Вы выиграли." : "Вы проиграли.";

    return result;
  }
}
