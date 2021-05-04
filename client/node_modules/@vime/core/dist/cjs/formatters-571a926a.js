'use strict';

const getHours = (value) => Math.trunc((value / 60 / 60) % 60);
const getMinutes = (value) => Math.trunc((value / 60) % 60);
const getSeconds = (value) => Math.trunc(value % 60);
const formatTime = (seconds = 0, alwaysShowHours = false) => {
  // Format time component to add leading zero.
  const format = (value) => `0${value}`.slice(-2);
  const hours = getHours(seconds);
  const mins = getMinutes(seconds);
  const secs = getSeconds(seconds);
  return `${alwaysShowHours || hours > 0 ? `${hours}:` : ''}${format(mins)}:${format(secs)}`;
};

exports.formatTime = formatTime;
