import assemblePayload from './../src/assemblePayload';

describe('assemblePayload', () => {
  test('should throw error', () => {
    expect(() => {
      assemblePayload([])
    }).toThrow(Error)
  })
  test('payloadString', () => {
    const obj = {'foo': 'foo'};
    const base = 'douban://douban.com';
    expect(assemblePayload(obj, base)).toBe(`/${base}?foo=foo`)
  })
})