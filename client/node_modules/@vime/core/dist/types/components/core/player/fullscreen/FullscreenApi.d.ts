interface FullscreenApi {
  prefixed: boolean;
  requestFullscreen?: string;
  exitFullscreen?: string;
  fullscreenElement?: string;
  fullscreenEnabled?: string;
  fullscreenchange?: string;
  fullscreenerror?: string;
  fullscreen?: string;
}
/**
 * Normalizes native fullscreen API differences across browsers.
 *
 * @ref https://github.com/videojs/video.js/blob/7.6.x/src/js/fullscreen-api.js
 */
export declare const getFullscreenApi: () => FullscreenApi;
export {};
