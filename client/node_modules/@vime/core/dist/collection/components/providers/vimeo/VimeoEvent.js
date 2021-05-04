/**
 * @see https://developer.vimeo.com/player/sdk/reference#events-for-playback-controls
 */
export var VimeoEvent;
(function (VimeoEvent) {
  VimeoEvent["Play"] = "play";
  VimeoEvent["Pause"] = "pause";
  VimeoEvent["Seeking"] = "seeking";
  VimeoEvent["Seeked"] = "seeked";
  VimeoEvent["TimeUpdate"] = "timeupdate";
  VimeoEvent["VolumeChange"] = "volumechange";
  VimeoEvent["DurationChange"] = "durationchange";
  VimeoEvent["FullscreenChange"] = "fullscreenchange";
  VimeoEvent["CueChange"] = "cuechange";
  VimeoEvent["Progress"] = "progress";
  VimeoEvent["Error"] = "error";
  VimeoEvent["PlaybackRateChange"] = "playbackratechange";
  VimeoEvent["Loaded"] = "loaded";
  VimeoEvent["BufferStart"] = "bufferstart";
  VimeoEvent["BufferEnd"] = "bufferend";
  VimeoEvent["TextTrackChange"] = "texttrackchange";
  VimeoEvent["Waiting"] = "waiting";
  VimeoEvent["Ended"] = "ended";
})(VimeoEvent || (VimeoEvent = {}));
