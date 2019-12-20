import { getType, namespace, obj2str, 
  str2obj, callUri } from './../src/utils';

describe('utils', () => {
  test('obj2str', () => {
    const obj = {'foo': 'foo', 'bar': 'bar'};
    expect(obj2str(obj)).toBe('foo=foo&bar=bar')
  })

  test('str2obj', () => {
    const str = 'foo=foo&bar=bar'
    expect(str2obj(str)).toEqual({'foo': 'foo', 'bar': 'bar'})
  })

  test('getType', () => {
    const obj = {};
    const arr = [1,2,3];
    const str = 'test';
    const un = undefined;
    const nu = null;
  
    expect(getType(obj)).toBe('Object');
    expect(getType(arr)).toBe('Array');
    expect(getType(str)).toBe('String');
    expect(getType(un)).toBe('Undefined');
    expect(getType(nu)).toBe('Null');
  })
  
  test('namespace', () => {
    let root = {};
    const r = namespace('Rexxar.Wdiget.AlertDialog', root);
    expect(r).toEqual({})
    expect(JSON.stringify(root)).toBe('{"Rexxar":{"Wdiget":{"AlertDialog":{}}}}')
  })

  test('callUri', () => {
    const uri = 'douban://douban.com';
    const container = document.createElement('iframe');
    callUri(uri, container);
    expect(container.src).toEqual(uri);
  })
  
})
