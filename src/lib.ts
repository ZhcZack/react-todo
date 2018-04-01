import { CSSProperties } from "react";

export const log = console.log.bind(console);

export const mix = (...args: CSSProperties[]): CSSProperties => {
  return Object.assign({}, ...args);
};
