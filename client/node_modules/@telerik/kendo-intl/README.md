[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/telerik/kendo-intl.svg?branch=master)](https://travis-ci.org/telerik/kendo-intl)
[![npm version](https://badge.fury.io/js/%40telerik%2Fkendo-intl.svg)](https://badge.fury.io/js/%40telerik%2Fkendo-intl)


# Kendo UI Internationalization

This repository contains the source code and documentation of the Kendo UI Internationalization package.

It includes methods for parsing and formatting dates and numbers by using [Unicode Common Locale Data Repository (CLDR)](http://cldr.unicode.org/) data. These methods are split into the following modules:

* [CLDR](#cldr-data)
* [Date Parsing](#date-parsing)
* [Date Formatting](#date-formatting)
* [Number Parsing](#number-parsing)
* [Number Formatting](#number-formatting)
* [General Formatting](#general-formatting)

## Basic Usage

### CLDR Data

To download the full CDLR database, you need to install the [cldr-data module](https://www.npmjs.com/package/cldr-data) by running the following command.

```sh
npm install --save cldr-data
```

To apply the methods for different locales, load the `likelySubtags` and the locale data by using the [`load`](https://github.com/telerik/kendo-intl/blob/master/docs/cldr/api.md#load) method.

Additionally, the library requires you to load:
* The supplemental `currencyData` for the default currency formatting.
* The `weekData` for the day of week formatting.

```javascript
import { load } from '@telerik/kendo-intl';

load(
    require("cldr-data/supplemental/likelySubtags.json"),
    require("cldr-data/supplemental/currencyData.json"),
    require("cldr-data/supplemental/weekData.json"),

    require("cldr-data/main/bg/numbers.json"),
    require("cldr-data/main/bg/currencies.json"),
    require("cldr-data/main/bg/ca-gregorian.json"),
    require("cldr-data/main/bg/dateFields.json"),
    require("cldr-data/main/bg/timeZoneNames.json")
);
```

For more examples and available configuration options, refer to the article on [CLDR Data](https://github.com/telerik/kendo-intl/blob/master/docs/cldr/index.md).

### Date Parsing

Date parsing converts a string into a `Date` object by using the specific settings of the locale.

```js
import { parseDate } from '@telerik/kendo-intl';

parseDate("11/6/2000", ["G", "d"]); // Mon Nov 06 2000
parseDate("Montag, 6.11.2000", "EEEE, d.MM.y", "de"); // Mon Nov 06 2000
parseDate("2000-11-06T10:30Z"); // Mon Nov 06 2000 12:30
```

For more examples and available configuration options, refer to the article on [date parsing](https://github.com/telerik/kendo-intl/blob/master/docs/date-parsing/index.md).

### Date Formatting

Date formatting converts a `Date` object into a human-readable string by using the specific settings of the locale.

```js
import { formatDate } from '@telerik/kendo-intl';

formatDate(new Date(2000, 10, 6), "d"); // 11/6/2000
formatDate(new Date(2000, 10, 6), "yMd", "de"); // 6.11.2000
formatDate(new Date(2000, 10, 6), "EEEE, d.MM.y", "bg"); // понеделник, 6.11.2000
```

For more examples and available configuration options, refer to the article on [date formatting](https://github.com/telerik/kendo-intl/blob/master/docs/date-formatting/index.md).

### Number Parsing

Number parsing converts a string into a `Number` object by using the specific settings of the locale.

```js
import { parseNumber } from '@telerik/kendo-intl';

parseNumber("12.22"); // 12.22
parseNumber("1.212,22 €", "de"); // 1212.22
parseNumber("10.22 %"); // 0.1022
parseNumber("1,0000123e+4", "bg"); // 10000.123
```

For more examples and available configuration options, refer to the article on [number parsing](https://github.com/telerik/kendo-intl/blob/master/docs/num-parsing/index.md).

### Number Formatting

Number formatting converts a `Number` object into a human-readable string using the specific settings of the locale.

```js
import { formatNumber } from '@telerik/kendo-intl';

formatNumber(1234.567, "n2"); // 1,234.57

formatNumber(1234.567, "c", "de"); // 1.234,57 €

formatNumber(1234.567, {
   style: "currency",
   currency: "USD",
   currencyDisplay: "displayName"
}, "bg"); // 1 234,57 щатски долара

formatNumber(2345678, "##,#.00"); // 2,345,678.00
```

For more examples and available configuration options, refer to the article on [number formatting](https://github.com/telerik/kendo-intl/blob/master/docs/num-formatting/index.md).

### General Formatting

General formatting provides methods for independent placeholder and type formatting by using the specific settings of the locale.

```js
import { format, toString } from '@telerik/kendo-intl';

format('Date: {0:d} - Price: {1:c}', [new Date(), 10.5], "en") // Date: 1/5/2017 - Price: $10.50

toString(10.5, "c", "bg"); // 10,50 лв.

toString(new Date(), "d"); // 1/5/2017
```

For more examples and available configuration options, refer to the article on [general formatting](https://github.com/telerik/kendo-intl/blob/master/docs/general-formatting/index.md).

## Installation

1. The Internationalization library is published as a [scoped NPM package](https://docs.npmjs.com/misc/scope) in the [NPMJS Telerik account](https://www.npmjs.com/~telerik).

2. Download and install the module:

    ```bash
    npm install --save '@telerik/kendo-intl';
    ```

3. Once installed, import the Internationalization in your application root module:

    ```javascript
    // ES2015 module syntax
    import { formatDate, parseDate } from '@telerik/kendo-intl';
    //or
    import { formatNumber, parseNumber } from '@telerik/kendo-intl';
    ```
    ```javascript
    // CommonJS format
    var numbers = require('@telerik/kendo-intl/number').numbers;
    //or
    var dates = require('@telerik/kendo-intl/dates').dates;
    ```
