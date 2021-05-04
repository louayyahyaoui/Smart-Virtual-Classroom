import { getElement } from '@stencil/core';
import { isInstanceOf } from '../../utils/unit';
export const PROVIDER_CHANGE_EVENT = 'vmProviderChange';
/**
 * Creates a dispatcher on the given `ref`, to send updates to the closest ancestor player via
 * the custom `vmProviderChange` event.
 *
 * @param ref A component reference to dispatch the state change events from.
 */
export const createProviderDispatcher = (ref) => (prop, value) => {
  const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
  const event = new CustomEvent(PROVIDER_CHANGE_EVENT, {
    bubbles: true,
    composed: true,
    detail: { by: el, prop, value },
  });
  el.dispatchEvent(event);
};
