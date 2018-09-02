import { browser, by, element } from 'protractor';
import { random } from 'lodash';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getContainer() {
  	return element(by.css('.app__container'));
  }

  getGameResult() {
  	return element(by.css('.app__result')).getText();
  }

  getStartButton() {
    return element(by.css('.app__nav .app__nav-button--started'));
  }

  getRestartButton() {
    return element(by.css('.app__nav .app__nav-button--restarted'));
  }

  getStartedOverButton() {
    return element(by.css('.app__nav .app__nav-button--startedover'));
  }

  getGameContainer() {
  	return element(by.css('.app__game-container'));
  }

  getBattlefieldContainer() {
  	return element.all(by.tagName("app-battlefield"));
  }

  getBattlefields() {
  	return element.all(by.tagName("app-battlefield-field"));
  }

  getFreeBattlefieldCells(field) {
  	return field.all(by.css(".battlefield-cell:not(.battlefield-cell--missed):not(.battlefield-cell--damaged)"));
  }

  getDamagedBattlefieldCells(field) {
  	return field.all(by.css(".battlefield-cell--damaged"));
  }

  getPlayerField() {
  	return this.getBattlefields().first();
  }

  getEnemyField() {
  	return this.getBattlefields().last();
  }

  getPlayerFreeCells() {
  	return this.getFreeBattlefieldCells(this.getPlayerField());
  }

  getEnemyFreeCells() {
  	return this.getFreeBattlefieldCells(this.getEnemyField());
  }

  getPlayerDamagedCells() {
  	return this.getDamagedBattlefieldCells(this.getPlayerField());
  }

  getEnemyDamagedCells() {
  	return this.getDamagedBattlefieldCells(this.getEnemyField());
  }

  async clickToRandomEnemyFreeCell() {
  	let cells = this.getEnemyFreeCells();
  	let count = await cells.count();

  	let randomCellIndex = random(count - 1);
  	let cell = cells.get(randomCellIndex);

  	cell.click();
  }

  async battlefieldGameEmulate() {
  	let startedButton = this.getStartButton();
    startedButton.click();

    await browser.waitForAngular();

    while (await this.getGameResult() === '') {
    	await this.clickToRandomEnemyFreeCell();

    	await browser.waitForAngular();
    };

    return Promise.resolve("end");
  }
}
