import { isUndefined } from '../../../utils/unit';
export class Logger {
  constructor() {
    this.silent = false;
  }
  log(...args) {
    if (!this.silent && !isUndefined(console))
      console.log('[Vime tip]:', ...args);
  }
  warn(...args) {
    if (!this.silent && !isUndefined(console))
      console.error('[Vime warn]:', ...args);
  }
}
