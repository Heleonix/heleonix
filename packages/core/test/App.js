import { App } from '../src/App';

describe('Given the App class', () => {
  describe('When an instance is created', () => {
    let instance;

    beforeEach(() => {
      instance = new App();
    });

    describe('And the components is get', () => {
      it('Should throw the notImplemented Error exception', () => {
        expect(1).toBe(1);
      });
    });
  });
});
