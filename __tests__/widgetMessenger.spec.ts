import widgetMessenger from './../src/widgetMessenger';

describe('widgetMessenge', () => {
  test('with schema', () => {
    const schema = 'douban';
    const host = 'rexxar-container';
    const name = 'widget/alert_dialog';
    const payload='width=300&height=300';

    const r = `${schema}://${host}/${name}${payload}`
    expect(widgetMessenger(schema, host)(name)(payload)).toBe(r);
  })
})