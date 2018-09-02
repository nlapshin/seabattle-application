import { BattlefieldModule } from './battlefield.module';

describe('BattlefieldModule', () => {
  let battlefieldModule: BattlefieldModule;

  beforeEach(() => {
    battlefieldModule = new BattlefieldModule();
  });

  it('should create an instance', () => {
    expect(battlefieldModule).toBeTruthy();
  });
});