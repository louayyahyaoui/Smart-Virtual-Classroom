var Provider;
(function (Provider) {
  Provider["Audio"] = "audio";
  Provider["Video"] = "video";
  Provider["HLS"] = "hls";
  Provider["Dash"] = "dash";
  Provider["YouTube"] = "youtube";
  Provider["Vimeo"] = "vimeo";
  Provider["Dailymotion"] = "dailymotion";
})(Provider || (Provider = {}));

export { Provider as P };
