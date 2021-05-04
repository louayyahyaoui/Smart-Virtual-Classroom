// Make sure to leave a padding.
const PADDING = 12 * 4;

// Get the preview bar height.
const PREVIEW_BAR_HEIGHT = 52;

const getViewportWidth = viewportElem =>
  viewportElem.width || viewportElem.clientWidth;

/**
 * Get the viewport height, with its constraints.
 *
 * @param  {Object} viewportElem
 * @return {Number}
 */
const getViewportHeight = viewportElem =>
  (viewportElem.height || viewportElem.clientHeight) -
  PREVIEW_BAR_HEIGHT -
  PADDING;

/**
 * Get the `scale` attribute for the "fit to screen" option.
 *
 * @param  {Object} viewportElem
 * @param  {Object} contentElem
 * @return {Number}
 */
export const getFitToScreenScale = (viewportElem, contentElem) => {
  // Get the viewport ratio.
  const viewportWidth = getViewportWidth(viewportElem);
  const viewportHeight = getViewportHeight(viewportElem);
  const viewportRatio = viewportWidth / viewportHeight;

  // Get the content ratio.
  const contentWidth = contentElem.width || contentElem.offsetWidth;
  const contentHeight = contentElem.height || contentElem.offsetHeight;
  const contentRatio = contentWidth / contentHeight;

  if (contentHeight > viewportHeight && contentWidth > viewportWidth) {
    const heightRatio = viewportHeight / contentHeight;
    const widthRatio = viewportWidth / contentWidth;

    return Math.min(widthRatio, heightRatio);
  }

  if (contentHeight > viewportHeight) {
    return viewportHeight / contentHeight;
  }

  if (contentWidth > viewportWidth) {
    return viewportWidth / contentWidth;
  }

  // Get the scaling ratio in `0.25` steps.
  return (
    Math.round(
      (viewportRatio > contentRatio
        ? viewportHeight / contentHeight
        : viewportWidth / contentWidth) * 4,
    ) / 4
  );
};

/**
 * Get the `scale` attribute for the "fit to width" option.
 *
 * @param  {Object} viewportElem
 * @param  {Object} contentElem
 * @return {Number}
 */
export const getFitToWidthScale = (viewportElem, contentElem) => {
  // Get the viewport ratio.
  const viewportWidth = getViewportWidth(viewportElem);

  // Get the content ratio.
  const contentWidth = contentElem.width || contentElem.offsetWidth;

  // Get the scaling ratio, after removing the padding.
  return (viewportWidth - PADDING) / contentWidth;
};

export default getFitToWidthScale;
