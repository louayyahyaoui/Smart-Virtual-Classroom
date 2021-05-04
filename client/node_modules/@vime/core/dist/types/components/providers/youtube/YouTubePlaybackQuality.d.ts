export declare const enum YouTubePlaybackQuality {
  Unknown = "unknown",
  Tiny = "tiny",
  Small = "small",
  Medium = "medium",
  Large = "large",
  Hd720 = "hd720",
  Hd1080 = "hd1080",
  Highres = "highres",
  Max = "max"
}
export declare const mapYouTubePlaybackQuality: (quality: YouTubePlaybackQuality) => "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | undefined;
