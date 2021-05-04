# stencil-wormhole

[![package-badge]][package]
[![size-badge]][bundlephobia]
[![license-badge]][license]
[![semantic-release-badge]][semantic-release]

[package]: https://www.npmjs.com/package/stencil-wormhole
[package-badge]: https://img.shields.io/npm/v/stencil-wormhole
[bundlephobia]: https://bundlephobia.com/result?p=stencil-wormhole
[size-badge]: https://img.shields.io/bundlephobia/minzip/stencil-wormhole
[license]: https://github.com/mihar-22/stencil-wormhole/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/stencil-wormhole
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

## Introduction

This is a super simple and lightweight library, that helps pass props down [Stencil](https://stenciljs.com) 
component trees easily. It's similar to `React.Context` and `stencil-state-tunnel`.

Why not just use `stencil-state-tunnel`? Simply because it's not instance scoped at this time 
([issue #8](https://github.com/ionic-team/stencil-state-tunnel/issues/8)). In addition, this library
prefers injecting props instead of consuming them in JSX because:

1. Leads to **better component design** as you're aware of all the props required by the component.
2. Much **better testability** as you don't have to mock out some part of the component tree when testing
state changes. You simply pass in props the same way they're injected.

There's only two concepts to learn for this library:

- **Universe.** This is like a `Context.Provider` in `react` and `Tunnel.Provider` in `stencil-state-tunnel`.
It holds the current state of the sub-tree, and it's responsible for updating all of its children when 
the state changes.
- **Wormhole.** This is like `Context.Consumer` in `react` and `Tunnel.injectProps` in `
stencil-state-tunnel`. It simply opens a connection to its closest ancestor universe and requests 
props to be injected.

This is a simple diagram on what this library achieves:

- Universe
    - Child A
    - Child B
        - Child C (Open wormhole here and inject props)

This is a simple diagram on how a multiverse works, in which a universe's nested inside another one:

- Universe A
    - Child A (Bound to state of Universe A)
    - Child B (Bound to state of Universe A)
    - Child C (Assume this is Universe B)
        - Child D (Bound to state of Universe B)
        - Child E (Bound to state of Universe B)

Important to note, you can only nest universes if they live inside separate components.

## Guide

### Install

```bash
# npm
$: npm install stencil-wormhole

# yarn
$: yarn add stencil-wormhole

# pnpm
$: pnpm install stencil-wormhole
```

### Create Universe

```tsx
import { h, State, Component } from '@stencil/core'
import { Universe } from 'stencil-wormhole'

@Component({
    tag: 'my-parent'
})
export class MyParent {
    // 1. Setup your state.
    @State() state: Record<string, any> = {
        message: 'apples',
        data: { content: 1 },
        // ...
    };

    componentWillLoad() {
        // 2. Create the universe (it has to be called in this lifecycle method).
        Universe.create(this, this.state);
    }   

    // 3. Update your state as usual.

    render() {
        return (
          // 4. Create the universe provider.
          <Universe.Provider state={this.state}>
            <my-child />
          </Universe.Provider>
        );   
    }
}
```

### Open Wormhole

```tsx
import { h, Prop, Component } from '@stencil/core'
import { openWormhole } from 'stencil-wormhole'

@Component({
    tag: 'my-child'
})
export class MyChild {
    // 1. Setup all props that are being injected.
    @Prop() message!: string;
    @Prop() data!: object;

    render() {
        return (
            <div>{this.message}</div>
        );   
    }
}

// 2. Open the wormhole and pass in the props to be injected.
openWormhole(MyChild, ['message', 'data']);
```

If you want stricter typing on the `openWormhole` function then simply create a higher-order function.

```ts
import { openWormhole, WormholeConsumerConstructor } from 'stencil-wormhole'

interface SpecialProps {
    apples: string
}

export const openSpecialWormhole = (
    Component: WormholeConsumerConstructor, 
    props: (keyof SpecialProps)[]
) => openWormhole(Component, props);
```
