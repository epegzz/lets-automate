import { isArray, isFunction } from 'lodash'

type FlowContext = {
  values: { [key: string]: unknown }
}

type StepArgs = {
  input: unknown
  context: FlowContext
}

type ExecResult = {
  output: unknown
}

export type Step<StepResult = unknown> = (
  args: StepArgs
) => Promise<StepResult> | StepResult

export class Flow {
  static async exec(steps: Step | Step[]): Promise<ExecResult> {
    const context = {
      values: {},
    }
    if (isArray(steps)) {
      let prevStepResult: unknown = null
      for (const step of steps) {
        prevStepResult = await step({ context, input: prevStepResult })
      }
      return { output: prevStepResult }
    } else if (isFunction(steps)) {
      return { output: await steps({ context, input: null }) }
    } else {
      throw new Error('Flow.exec: steps must be an array or a function')
    }
  }
}
