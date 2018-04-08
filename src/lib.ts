import { CSSProperties } from 'react'

export const log = console.log.bind(console)

export const mix = (...args: CSSProperties[]): CSSProperties => {
  let o: React.CSSProperties = {}
  for (let arg of args) {
    for (let p in arg) {
      if (arg.hasOwnProperty(p)) {
        o[p] = arg[p]
      }
    }
  }
  return o
}
