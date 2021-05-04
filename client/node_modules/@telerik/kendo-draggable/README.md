[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Kendo UI Draggable

A repository for the cross-platform abstraction for drag sequences.

* [Overview](#overview)
* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [Features](#features)
* [What's Next](#whats-next)
* [Dragging on iOS/Android](#dragging-on-iosandroid)
* [Preventing Selection](#preventing-selection)
* [Browser Support](#browser-support)

## Overview

The Kendo UI Draggable component handles mouse drags and touch sequences on mobile devices.

A drag sequence means:

- Mouse click, drag, release for desktop devices.
- Touch press, drag, release for mobile devices.

## Installation

The library is published as a [scoped NPM package](https://docs.npmjs.com/misc/scope) in the [NPMJS Telerik account](https://www.npmjs.com/~telerik).

```bash
npm install --save '@telerik/kendo-draggable';
```

## Basic Usage

The `draggable` class constructor accepts an object with three optional event handler callbacks&mdash;`press`, `drag`, and `release`.

```javascript
import Draggable from '@telerik/kendo-draggable';

const draggable = new Draggable({
    press: function(e) {
        console.log("pressed", e.pageX, e.pageY);
    },
    drag: function(e) {
        console.log("drag", e.pageX, e.pageY);
    },
    release: function(e) {
        console.log("release", e.pageX, e.pageY);
    }
});

draggable.bindTo(document.getElementById("my-element"));
```

The Draggable may be re-bound to another element&mdash;the event handlers will be automatically unbound from the previous one.

```javascript
draggable.bindTo(document.getElementById("another-element"));
```

The `draggable` object persists a reference to the currently bound element. That is why it should be destroyed when or if the corresponding element is removed from the document.

```javascript
draggable.destroy();
```

## Features

The Kendo UI Draggable supports:

- Mouse events
- Touch events
- Pointer events
- Handling of multiple touches. Rather, not getting confused by them.

## Dragging on iOS/Android

Handling the drag sequence on mobile devices may require the disabling of the touch-based scrolling. The Draggable will not do that out of the box. The recommended way to handle this issue is by setting a [`touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) CSS property. Depending on the type of drags that are handled, you may need `touch-action: none`, `touch-action: pan-y`, or `touch-action: pan-x`.

> The `touch-action` setting does not work for iOS yet. While the iOS 9.3 version, which has been released recently, provides limited support, `pan-x` and `pan-y` do not work. To disable the touch-based scrolling in iOS, prevent the `touchstart` event:

```html
    <div ontouchstart="return false">
        <div id="my-draggable-element"></div>
    </div>
```

## Preventing Selection

The dragging of elements that contain text activates the browser text selection, which, in most cases, is not desirable. To avoid this behavior, use the [`user-select: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select) CSS property with its respective browser prefixes.

## Mouse-Only mode

To ignore all touch and pointer events, set `mouseOnly` to `true`. This is useful when you want to keep the default touch-drag behavior, e.g. horizontal scroll.

```javascript
import Draggable from '@telerik/kendo-draggable';

const draggable = new Draggable({
    mouseOnly: true,
    press: function(e) {
        console.log("pressed", e.pageX, e.pageY);
    },
    drag: function(e) {
        console.log("drag", e.pageX, e.pageY);
    },
    release: function(e) {
        console.log("release", e.pageX, e.pageY);
    }
});

draggable.bindTo(document.getElementById("my-element"));
```


## Browser Support

- Google Chrome
- Firefox
- Safari (OS X)
- Safari (iOS)
- Chrome (Android)
- IE/Edge
