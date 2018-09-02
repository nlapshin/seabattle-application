import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display started button and hidden game container', async() => {
    page.navigateTo();

    await browser.waitForAngular();

    let appContainer = page.getContainer();

    expect(appContainer.isPresent()).toBe(true);

  	let startedButton = page.getStartButton();
    let restartedButton = page.getRestartButton();
    let startedoverButton = page.getStartedOverButton();

    expect(startedButton.isPresent()).toBe(true);
    expect(restartedButton.isPresent()).toBe(false);
    expect(startedoverButton.isPresent()).toBe(false);

    let gameContainer = page.getGameContainer();

    expect(gameContainer.isPresent()).toBe(true);
 		expect(gameContainer.isDisplayed()).toBe(false);
  });

  it('should display game container after started game and hidden started button', async() => {
    page.navigateTo();

    await browser.waitForAngular();

  	let startedButton = page.getStartButton();
    let restartedButton = page.getRestartButton();
    let startedoverButton = page.getStartedOverButton();

    startedButton.click();

    await browser.waitForAngular();

    expect(startedButton.isPresent()).toBe(false);
    expect(restartedButton.isPresent()).toBe(true);
    expect(startedoverButton.isPresent()).toBe(false);

    let gameContainer = page.getGameContainer();

    expect(gameContainer.isPresent()).toBe(true);
 		expect(gameContainer.isDisplayed()).toBe(true);
  });

  it('should form seabattle fields after start game', async() => {
    page.navigateTo();

    await browser.waitForAngular();

  	let startedButton = page.getStartButton();
    startedButton.click();

    await browser.waitForAngular();

    let fieldContainer = page.getBattlefieldContainer();
    let fields = page.getBattlefields();

    expect(fieldContainer.count()).toBe(1);
    expect(fields.count()).toBe(2);
  });

  it('should mark enemy cell after click to him', async() => {
    page.navigateTo();

    await browser.waitForAngular();

  	let startedButton = page.getStartButton();
    startedButton.click();

    await browser.waitForAngular();

    expect(page.getEnemyFreeCells().count()).toBe(100);
    page.clickToRandomEnemyFreeCell();

    await browser.waitForAngular();

    expect(page.getEnemyFreeCells().count()).toBe(99);
  });

  it('should emulate battlefield gameplay', async() => {
    page.navigateTo();

    await browser.waitForAngular();

  	await page.battlefieldGameEmulate();

    let result = await page.getGameResult();
    let playerDamaged = await page.getPlayerDamagedCells().count();
    let enemyDamaged = await page.getEnemyDamagedCells().count();

    let startedButton = page.getStartButton();
    let restartedButton = page.getRestartButton();
    let startedoverButton = page.getStartedOverButton();

    expect(result).not.toBe('');

    if (playerDamaged < enemyDamaged) {
    	expect(result).toBe('Игра окончена. Вы выиграли.');
    } else {
    	expect(result).toBe('Игра окончена. Вы проиграли.');
    };

    expect(startedButton.isPresent()).toBe(false);
    expect(restartedButton.isPresent()).toBe(false);
    expect(startedoverButton.isPresent()).toBe(true);
  });

  it('should restarted game after end game', async() => {
    page.navigateTo();

    await browser.waitForAngular();

    await page.battlefieldGameEmulate();

    let playerFreeCellsCount = await page.getPlayerFreeCells().count();
		let enemyFreeCellsCount = await page.getEnemyFreeCells().count();

		expect(playerFreeCellsCount).not.toBe(100);
		expect(enemyFreeCellsCount).not.toBe(100);

    let startedoverButton = page.getStartedOverButton();
    startedoverButton.click();

    await browser.waitForAngular();

    playerFreeCellsCount = await page.getPlayerFreeCells().count();
		enemyFreeCellsCount = await page.getEnemyFreeCells().count();

		expect(playerFreeCellsCount).toBe(100);
		expect(enemyFreeCellsCount).toBe(100);
  });
});


    


    
