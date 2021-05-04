export const mapYouTubePlaybackQuality = (quality) => {
  switch (quality) {
    case "unknown" /* Unknown */:
      return undefined;
    case "tiny" /* Tiny */:
      return '144p';
    case "small" /* Small */:
      return '240p';
    case "medium" /* Medium */:
      return '360p';
    case "large" /* Large */:
      return '480p';
    case "hd720" /* Hd720 */:
      return '720p';
    case "hd1080" /* Hd1080 */:
      return '1080p';
    case "highres" /* Highres */:
      return '1440p';
    case "max" /* Max */:
      return '2160p';
    default:
      return undefined;
  }
};
