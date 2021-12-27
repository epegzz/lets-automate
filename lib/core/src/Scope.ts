import { get, isString, set } from 'lodash'

import { Step } from './Flow'

type SetValueArgs = [string?, string?]
type GetValueArgs = [string?]

export class Scope {
  static setValue(...args: SetValueArgs): Step {
    return async ({ context, input }) => {
      if (args.length === 2) {
        // Take value from second argument
        if (!isString(args[0])) {
          throw new Error('Scope.setValue: first argument must be a string')
        }
        set(context.values, args[0], args[1])
      } else if (args.length === 1) {
        // Take value from input
        if (!isString(args[0])) {
          throw new Error('Scope.setValue: first argument must be a string')
        }
        context.values[args[0]] = input
      } else {
        throw new Error('Scope.setValue: invalid arguments')
      }
      return input
    }
  }

  static getValue(...args: GetValueArgs): Step {
    return async ({ context, input }) => {
      if (args.length === 1) {
        if (!isString(args[0])) {
          throw new Error('Scope.getValue: first argument must be a string')
        }
        return get(context.values, args[0])
      }
      return input
    }
  }
}
