import { Flow } from './Flow'

describe('Flow', () => {
  describe('exec', () => {
    test('single step', async () => {
      const step = async () => {
        return 'step-1'
      }
      const { output } = await Flow.exec(step)
      expect(output).toBe('step-1')
    })

    test('multiple steps', async () => {
      const steps = [
        async () => {
          return 'step-1'
        },
        async ({ input }) => {
          return `${input} step-2`
        },
      ]
      const { output } = await Flow.exec(steps)
      expect(output).toBe('step-1 step-2')
    })
  })
})
