/**
 * DevExtreme (viz/core/themes/generic.softblue.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _themes = require("../../themes");
var ACCENT_COLOR = "#7ab8eb";
var BACKGROUND_COLOR = "#fff";
var TITLE_COLOR = "#333";
var SUBTITLE_COLOR = "#99a1a8";
var TEXT_COLOR = "#707070";
var BORDER_COLOR = "#e8eaeb";
(0, _themes.registerTheme)({
    name: "generic.softblue",
    defaultPalette: "Soft Blue",
    backgroundColor: BACKGROUND_COLOR,
    primaryTitleColor: TITLE_COLOR,
    secondaryTitleColor: SUBTITLE_COLOR,
    gridColor: BORDER_COLOR,
    axisColor: TEXT_COLOR,
    "export": {
        backgroundColor: BACKGROUND_COLOR,
        font: {
            color: TITLE_COLOR
        },
        button: {
            "default": {
                color: TITLE_COLOR,
                borderColor: "#c9d0d4",
                backgroundColor: BACKGROUND_COLOR
            },
            hover: {
                color: TITLE_COLOR,
                borderColor: "#a7b2b9",
                backgroundColor: "#e6e6e6"
            },
            focus: {
                color: TITLE_COLOR,
                borderColor: "#82929b",
                backgroundColor: "#e6e6e6"
            },
            active: {
                color: TITLE_COLOR,
                borderColor: "#82929b",
                backgroundColor: "#d4d4d4"
            }
        }
    },
    legend: {
        font: {
            color: TEXT_COLOR
        }
    },
    tooltip: {
        color: BACKGROUND_COLOR,
        border: {
            color: BORDER_COLOR
        },
        font: {
            color: TITLE_COLOR
        }
    },
    "chart:common": {
        commonSeriesSettings: {
            label: {
                border: {
                    color: BORDER_COLOR
                }
            }
        }
    },
    "chart:common:annotation": {
        color: BACKGROUND_COLOR,
        border: {
            color: BORDER_COLOR
        },
        font: {
            color: TITLE_COLOR
        }
    },
    chart: {
        commonPaneSettings: {
            border: {
                color: BORDER_COLOR
            }
        },
        commonAxisSettings: {
            breakStyle: {
                color: "#cfd2d3"
            }
        }
    },
    rangeSelector: {
        scale: {
            breakStyle: {
                color: "#cfd2d3"
            },
            tick: {
                opacity: .12
            }
        },
        selectedRangeColor: ACCENT_COLOR,
        sliderMarker: {
            color: ACCENT_COLOR
        },
        sliderHandle: {
            color: ACCENT_COLOR,
            opacity: .5
        }
    },
    sparkline: {
        pointColor: BACKGROUND_COLOR,
        minColor: "#f0ad4e",
        maxColor: "#d9534f"
    },
    treeMap: {
        group: {
            color: BORDER_COLOR,
            label: {
                font: {
                    color: SUBTITLE_COLOR
                }
            }
        }
    },
    bullet: {
        color: ACCENT_COLOR
    },
    gauge: {
        valueIndicators: {
            rangebar: {
                color: ACCENT_COLOR
            },
            textcloud: {
                color: ACCENT_COLOR
            }
        }
    }
}, "generic.light");
(0, _themes.registerTheme)({
    name: "generic.softblue.compact"
}, "generic.softblue");
