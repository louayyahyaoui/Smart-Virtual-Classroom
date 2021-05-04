"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _themeTools = require("@chakra-ui/theme-tools");

var parts = ["track", "thumb"];

function baseStyleTrack(props) {
  var c = props.colorScheme;
  return {
    borderRadius: "full",
    p: "2px",
    transition: "all 120ms",
    bg: (0, _themeTools.mode)("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: (0, _themeTools.mode)(c + ".500", c + ".200")(props)
    }
  };
}

var baseStyleThumb = {
  bg: "white",
  transition: "transform 250ms",
  borderRadius: "full",
  transform: "translateX(0)"
};

var baseStyle = function baseStyle(props) {
  return {
    track: baseStyleTrack(props),
    thumb: baseStyleThumb
  };
};

var sizes = {
  sm: {
    track: {
      w: "1.375rem",
      h: "0.75rem"
    },
    thumb: {
      w: "0.75rem",
      h: "0.75rem",
      _checked: {
        transform: "translateX(0.625rem)"
      }
    }
  },
  md: {
    track: {
      w: "1.875rem",
      h: "1rem"
    },
    thumb: {
      w: "1rem",
      h: "1rem",
      _checked: {
        transform: "translateX(0.875rem)"
      }
    }
  },
  lg: {
    track: {
      w: "2.875rem",
      h: "1.5rem"
    },
    thumb: {
      w: "1.5rem",
      h: "1.5rem",
      _checked: {
        transform: "translateX(1.375rem)"
      }
    }
  }
};
var defaultProps = {
  size: "md",
  colorScheme: "blue"
};
var _default = {
  parts: parts,
  baseStyle: baseStyle,
  sizes: sizes,
  defaultProps: defaultProps
};
exports["default"] = _default;
//# sourceMappingURL=switch.js.map