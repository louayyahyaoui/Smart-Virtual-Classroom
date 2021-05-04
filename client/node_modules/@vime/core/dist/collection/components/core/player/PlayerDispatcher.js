import { getElement } from '@stencil/core';
import { isInstanceOf } from '../../../utils/unit';
export const STATE_CHANGE_EVENT = 'vmStateChange';
/**
 * Creates a dispatcher on the given `ref`, to send updates to the closest ancestor player via
 * the custom `vmStateChange` event.
 *
 * @param ref An element to dispatch the state change events from.
 */
export const createDispatcher = (ref) => (prop, value) => {
  const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
  const event = new CustomEvent(STATE_CHANGE_EVENT, {
    bubbles: true,
    composed: true,
    detail: { by: el, prop, value },
  });
  el.dispatchEvent(event);
};
