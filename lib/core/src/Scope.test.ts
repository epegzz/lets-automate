import { Flow } from './Flow'
import { Scope } from './Scope'

describe('Scope', () => {
  describe('setValue / getValue', () => {
    test('setValue(<key>, <value>)', async () => {
      const { output } = await Flow.exec([
        Scope.setValue('key', 'value'),
        () => 'someOtherValue',
        Scope.getValue('key'),
      ])
      expect(output).toBe('value')
    })
    test('setValue(<key>)', async () => {
      const { output } = await Flow.exec([
        () => 'value',
        Scope.setValue('key'),
        () => 'someOtherValue',
        Scope.getValue('key'),
      ])
      expect(output).toBe('value')
    })
  })
})
