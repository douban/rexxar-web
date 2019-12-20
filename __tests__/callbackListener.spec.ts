import callbackListener from './../src/callbackListener';

describe('callbackListener', () => {
  test('return namespace.name', () => {
    const ns = 'Rexxar.Wdiget.AlertDialog';
    const objStr = 'foo=foo'
    const cb = <T>(data:T):T => {
      return data;
    }
    const self:any = window;
    const listener = callbackListener(ns)('open')(cb);
    expect(listener).toBe('Rexxar.Wdiget.AlertDialog.open');
    expect(self.Rexxar.Wdiget.AlertDialog.open(objStr)).toBe(objStr);
  })
})