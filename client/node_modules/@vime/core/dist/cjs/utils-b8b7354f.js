'use strict';

const audioRegex = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
const videoRegex = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;
const hlsRegex = /\.(m3u8)($|\?)/i;
const hlsTypeRegex = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i;
const dashRegex = /\.(mpd)($|\?)/i;

exports.audioRegex = audioRegex;
exports.dashRegex = dashRegex;
exports.hlsRegex = hlsRegex;
exports.hlsTypeRegex = hlsTypeRegex;
exports.videoRegex = videoRegex;
