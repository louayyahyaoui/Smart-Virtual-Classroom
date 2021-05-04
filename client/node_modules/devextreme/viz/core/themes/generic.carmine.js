/**
 * DevExtreme (viz/core/themes/generic.carmine.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _themes = require("../../themes");
var ACCENT_COLOR = "#f05b41";
var BACKGROUND_COLOR = "#fff";
var TITLE_COLOR = "#333";
var SUBTITLE_COLOR = "#8899a8";
var TEXT_COLOR = "#707070";
var BORDER_COLOR = "#dee1e3";
(0, _themes.registerTheme)({
    name: "generic.carmine",
    defaultPalette: "Carmine",
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
                borderColor: "#b1b7bd",
                backgroundColor: BACKGROUND_COLOR
            },
            hover: {
                color: TITLE_COLOR,
                borderColor: "#b1b7bd",
                backgroundColor: "#faf2f0"
            },
            focus: {
                color: TITLE_COLOR,
                borderColor: "#6d7781",
                backgroundColor: "#faf2f0"
            },
            active: {
                color: TITLE_COLOR,
                borderColor: "#6d7781",
                backgroundColor: "#f5e7e4"
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
        font: {
            color: TITLE_COLOR
        },
        border: {
            color: BORDER_COLOR
        },
        color: BACKGROUND_COLOR
    },
    chart: {
        commonPaneSettings: {
            border: {
                color: BORDER_COLOR
            }
        },
        commonAxisSettings: {
            breakStyle: {
                color: "#c1c5c7"
            }
        }
    },
    rangeSelector: {
        scale: {
            breakStyle: {
                color: "#c1c5c7"
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
        maxColor: "#f74d61"
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
    name: "generic.carmine.compact"
}, "generic.carmine");
