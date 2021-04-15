# string-capitalize-name

Convert your string to correctly string name.

### Usage
```sh
var SCN = require('string-capitalize-name');
var name = 'jameS patrick page';
var capName = SCN(name); //result: James Patrick Page
```
### Installation
```sh
npm install string-capitalize-name
```

### Options
- ignoreLessThanLength: Number

```sh
var SCN = require('string-capitalize-name');
var name = 'silvia da fonceca js.';
var capName = SCN(name,{ignoreLessThanLength: 3}); //result: Silvia da Fonceca js.'
```

