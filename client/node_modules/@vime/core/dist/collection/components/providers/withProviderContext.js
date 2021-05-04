import { withPlayerContext } from '../core/player/withPlayerContext';
export const withProviderContext = (provider, additionalProps = []) => withPlayerContext(provider, [
  'autoplay',
  'controls',
  'language',
  'muted',
  'logger',
  'loop',
  'aspectRatio',
  'playsinline',
  ...additionalProps,
]);
