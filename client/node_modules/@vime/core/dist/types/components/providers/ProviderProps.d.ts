import { PlayerProp, PlayerProps, WritableProps } from '../core/player/PlayerProps';
/**
 * Properties that can only be written to by a provider.
 */
export declare type ProviderWritableProps = WritableProps & Pick<PlayerProps, 'ready' | 'playing' | 'playbackReady' | 'playbackStarted' | 'playbackEnded' | 'seeking' | 'buffered' | 'buffering' | 'duration' | 'viewType' | 'mediaTitle' | 'mediaType' | 'currentSrc' | 'currentPoster' | 'playbackRates' | 'playbackQualities' | 'textTracks' | 'currentTextTrack' | 'isTextTrackVisible' | 'audioTracks' | 'currentAudioTrack' | 'isPiPActive' | 'isFullscreenActive'>;
export declare const isProviderWritableProp: (prop: PlayerProp) => boolean;
