# numab
npm package for parsing string numbers

## Installation

With [npm](https://npmjs.org) do

```bash
$ npm install numab
```


## Usage

### Basic usage
```js
var numab = require('numab');

numab.parse('2.5');     // => 2.5
numab.parse('2.5k');    // => 2500
numab.parse('2.5M');    // => 2500000
```

### Configuration

```js
var numab = require('numab');

numab.parse('2.5k');    // => 2500
numab.parse('2,5k');    // => NaN
numab.config({separator: ","});
numab.parse('2,5k');    // => 2500
```
Configuring instances
```js
var configObj = {separator: ","};

var numabInstance = numab.createInstace();
numabIntance.config(configObj);

// or

var numabInstance = numab.createInstace(configObj);

```

### Instancing
The module can create instances for different local configurations.

```js
var numab = require('numab');
var numabInstance = numab.createInstace();

numab.parse            // => [Function: parse]
numabInstance.parse    // => [Function: parse]
```