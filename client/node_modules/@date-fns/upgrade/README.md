# date-fns upgrade

Support package with helper functions for `date-fns` upgrade from `1.x` to `2.x`

Codemod that will help you apply these helpers automatically located here -
[date-fns-upgrade-codemod](https://github.com/date-fns/date-fns-upgrade-codemod).

## Installation

```bash
npm install @date-fns/upgrade --save
# or with yarn
yarn add @date-fns/upgrade
```

## Usage

### convertTokens

`convertTokens` is a helper function used for 2nd argument of `format` function
to convert date tokens like `YYYY` to new format.
See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg)
for more details.

```diff
+import { convertTokens } from '@date-fns/upgrade/v2'

const formattedDate = format(
  new Date(),
- 'YYYY',
+ convertTokens('YYYY'),
)
```

### legacyParse

`date-fns@2.x` functions don't accept string as arguments any more (see [CHANGELOG](https://github.com/date-fns/date-fns/blob/master/CHANGELOG.md#changed)), `legacyParse` is used to simplify that transition, it uses algorithm from `1.x` to do that. See [this post](https://blog.date-fns.org/post/we-cut-date-fns-v2-minimal-build-size-down-to-300-bytes-and-now-its-the-smallest-date-library-18f2nvh2z0yal) for details on "why" this was done.

```diff
+import { legacyParse } from '@date-fns/upgrade/v2'

const formattedDate = format(
- '2014',
+ legacyParse('2014'),
  'YYYY',
)
```

### legacyParseMap

`legacyParseMap` is used same as `legacyParse` but for arguments that accept arrays.

```diff
+import { legacyParseMap } from '@date-fns/upgrade/v2'

var dateToCompare = new Date(2015, 8, 6)
var datesArray = [
  '2014-01-01',
  '2015-01-01'
]
-var result = closestIndexTo(dateToCompare, datesArray)
+var result = closestIndexTo(dateToCompare, legacyParseMap(datesArray))
```

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
