# Numab
Number abbreviation or for short **Numab** is a simple module for parsing string numbers.


## Installation

With [npm](https://npmjs.org) do

```bash
$ npm install numab
```


## Usage

### Basic usage
```js
var numab = require('numab');

numab.parse("2.5");     // => 2.5
numab.parse("2.5k");    // => 2500
numab.parse("2.5M");    // => 2500000
```

### Dehumanizing
Accepts a string of a number that is formatted in a "humanized" manner and converts it to a proper number.
```js
numab.dehumanize("10,010");      // => 10010
numab.dehumanize("10,010.50");   // => 10010.50
```

### Instancing
The module can create instances for different local configurations.

```js
var numab = require("numab");
var numabInstance = numab.createInstace();

numab.parse            // => [Function: parse]
numabInstance.parse    // => [Function: parse]
```

### Configuration

```js
var numab = require('numab');

numab.parse("2.5k");    // => 2500
numab.parse("2,5k");    // => NaN
numab.config({separator: ","});
numab.parse("2,5k");    // => 2500

numab.config({separator: "," , deliminer: "."});
numab.dehumanize("1,100.52")
```
### Configuring instances
```js
var configObj = {separator: ","};

var numabInstance = numab.createInstace();
numabIntance.config(configObj);

// or

var numabInstance = numab.createInstace(configObj);

```