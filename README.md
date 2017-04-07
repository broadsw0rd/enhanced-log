# Enhanced Log (Not maintained)

>Amazing, flexible, extendable library for enhance [styling console output](https://developer.chrome.com/devtools/docs/console#styling-console-output-with-css)

[![Build Status](https://travis-ci.org/broadsw0rd/enhanced-log.svg?branch=master)](https://travis-ci.org/broadsw0rd/enhanced-log)
[![Coverage Status](https://coveralls.io/repos/broadsw0rd/enhanced-log/badge.svg)](https://coveralls.io/r/broadsw0rd/enhanced-log)
[![Code Climate](https://codeclimate.com/github/broadsw0rd/enhanced-log/badges/gpa.svg)](https://codeclimate.com/github/broadsw0rd/enhanced-log)
[![NPM version](https://img.shields.io/npm/v/enhanced-log.svg)](https://www.npmjs.com/package/enhanced-log)
![Bower version](https://img.shields.io/bower/v/enhanced-log.svg)

- - - - - - -

## Table of Contents

* [Enhanced Log](#enhanced-log)
  * [Table of Contents](#table-of-contents)
  * [Install](#install)
  * [Usage](#usage)
  * [API](#api)
    * [log.`<style>[.<style>...](message)`](#logstylestylemessage)
      * [Few words about `callout`, `divider` and `box`](#few-words-about-callout-divider-and-box)
    * [log.`styles`](#logstyles)
    * [log.`mapper(message)`](#logmappermessage)
    * [log.`api`](#logapi)
    * [log.`method`](#logmethod)
    * [log.`toString()`](#logtostring)
    * [log.`toJSON()`](#logtojson)
    * [log.`off()`](#logoff)
    * [log.`on()`](#logon)
    * [log.`toggle([state])`](#logtogglestate)
    * [log.`defaults`](#logdefaults)
    * [log.`mixin(target)`](#logmixintarget)
    * [log.`utils`](#logutils)
  * [Advanced Usage](#advanced-usage)
    * [Create your own logger](#create-your-own-logger)
    * [Taking advantage of the fact that `log` is function](#taking-advantage-of-the-fact-that-log-is-function)

## Install

```
$ npm install enhanced-log
```

```
$ bower install enhanced-log
```

Or just download [dev](http://broadsw0rd.github.io/enhanced-log/src/log.js) or [prod](http://broadsw0rd.github.io/enhanced-log/dist/log.min.js) version

- - - - - - -

## Usage

Browserify:

```js
var log = require('enhanced-log')
```

Browser: 

```html
<script src="log.min.js">
```

ES6:

```js
import * as log from 'log.min.js'

```

`log` has several chainable methods for styling your console output:

```js
// you can combine it what you want and enjoy

log('message')
// equal
console.log('%cmessage', '')

log.info('message')
// equal
console.log('%cmessage', 'color:#03a9f4;')

log.large.capitalize.info('message') 
// equal
console.log('%cmessage', 'color:#03a9f4;text-transform:capitalize;font-size:18px;')
```

[Demo](http://broadsw0rd.github.io/enhanced-log/)

- - - - - - -

## API

### log.`<style>[.<style>...](message)`

Return new instance of `log` object, so you can cached it for further use

```js
var error = log.large.danger

error.bold('Something going wrong') 
// console.log('%cSomething going wrong', 'font-weight:bold;color:#e51c23;font-size:18px;') 
```

List of chainable styling methods:

- `large`
- `huge`
- `small`
- `info`
- `success`
- `warning`
- `danger`
- `underline`
- `overline`
- `linethrough`
- `capitalize`
- `uppercase`
- `lowercase`
- `bold`
- `italic`
- `code`
- `divider`
- `callout`
- `box`

This methods very similar to CSS classes: 

- each can apply defined styles to output

```js
log.large      // "font-size:18px;"
log.info       // "color:#03a9f4;"
log.large.info // "color:#03a9f4;font-size:18px;"
```

- order doesn't matter

```js
log.info.large // same styles as `log.large.info`
```

- in case of conflict last override previous

```js
log.small.large.huge // equal to log.huge
```

#### Few words about `callout`, `divider` and `box`

These methods are modify log string:

```js
log.divider('message') // useful for separating output
```

    ==================== message ====================

```js
log.callout('message') // useful for emphasize
```

    ▌ 
    ▌ message
    ▌ 

```js
log.box('message') // useful :)
```

    *************
    *           *
    *  message  *
    *           *
    *************

Of course these methods are chainable

```js
log.divider.box.callout('message')
```

    ▌
    ▌   *********************************************************
    ▌   *                                                       *
    ▌   *  ===================== message =====================  *
    ▌   *                                                       *
    ▌   *********************************************************
    ▌
    
### log.`styles`

Object or function of CSS properties for styling output

```js
log.styles // {}

log.code.styles // function composed() { ... }

// this occurs cuz of styles inheritance

log.code.styles() // {color: "#C7254E", background-color: "#F9F2F4"}
```

Please do not modify this object, use [`log.defaults`](#logdefaults) instead

### log.`mapper(message)`

Function which modify log message before output

```js
log.divider.mapper('text') // "===================== text ====================="

var success = log.success
// Do not do this, use `log.defaults` instead
success.mapper = function(message){ return 'Ok :: ' + message }

success('text') 
// Ok :: text
```

If you chain styling methods with mapper functions, this function will composed

```js
success.divider('text')
// ================== Ok :: text ==================
```

### log.`api`

```js
log.api === console // true
```

By default it is `console` object, that means each instance of `log` use console API for logging, but you can define your own logging API and `log` will work fine with it, see [Advanced Usage](#advanced-usage)

### log.`method`

```js
log.method // "log"
```

By default it is `"log"`, that means each instance of `log` use `console["log"]` for logging, but you can redefine this behaviour:

```js
var warning = log.warning

warning.method = 'warn'

warning('Warning Message') // console.warn('%cWarning Message', 'color:#ff9800;')
```

Useful for filtering log messages by types

### log.`toString()`

String representation of `log` instance:

```js
log.code.toString() // "color:#C7254E;background-color:#F9F2F4;"
```

Useful for applying different styles to single log message. More info [here](https://developer.chrome.com/devtools/docs/tips-and-tricks#styled-console-multiple)

```js
console.log('%cAmazing, flexible, extendable wrapper for %cconsole.log%c to enhance %cstyling console output', log, log.code, log, log.bold) // try this in your DevTools
```

### log.`toJSON()`

Serialize log instance

### log.`off()`

**DEPRECATED**

Prevent **each** instance of `log` from output to console, works globally:

```js
var error = log.large.danger

error.off()

log.info('message') // nothing happens
```

### log.`on()`

**DEPRECATED**

Resume output to console for **each** instance of `log`, works globally too

### log.`toggle([state])`

**DEPRECATED**

Toggle output to console, if `state` defined, `true` value will enable output, `false` - disable

```js
log.toggle(DEBUG) // prevent output if DEBUG === false
```

### log.`defaults`

Object of default styling properties of each styling methods. Used for customizing predefined styling methods:

```js
log.defaults.code
/*
{
    styles: {
        color: "#C7254E", 
        background-color: "#F9F2F4"
    }
}
*/
```

You can simply change styles properties, mapper function or even `method` and `api` from examples above

```js
log.defaults.warning.method = 'warn'
log.defaults.success.mapper = function(message){ return 'Ok :: ' + message }

log.warning('Warning Message')
// equal
console.warn('%cWarning Message', 'color:#ff9800;')

log.success('Success Message')
// equal
console.log('%cOk :: Success Message', 'color:#259b24')
```

### log.`mixin(target)`

Method for defined your own styling methods:

```js
log.mixin({
	muted: {
		styles: {
			color: '#777'
		}
	}
})

log.small.muted('Unimportant Message')
// equal
console.log('%cUnimportant Message', 'color:#777;font-size:10px;')
```

Or use styles like a function

```js
log.mixin({
    rand: {
        styles: function(){
            return {
                color: '#' + (~~(Math.random()*(1<<24))).toString(16)
            }
        }
    }
})

log.rand.toString() // "color:#b95c4e;"
log.rand.toString() // "color:#f2158c;"
log.rand.toString() // "color:#f60484;"
```

### log.`utils`

Collection of useful utility functions

#### `.id(arg)`

Just a placeholder - return passing value

```js
let target = {}
expect(log.utils.id(target)).to.be(target)
```

#### `.result(arg)`

If passed function, call it and return result, otherwise just return passing value

```js
let target = {}
expect(log.utils.result(target)).to.be(target)
expect(log.utils.result(() => { return target })).to.be(target)
```

#### `.compose(func, func[, func...])`

Returns the composition of a list of functions

```js
let f = (x) => x*2
,   g = (x) => x+2

expect(log.utils.compose(f, g)(2)).to.be(8)
expect(log.utils.compose(g, f)(2)).to.be(6)
```

#### `.extend(target[, source...])`

Canonical extend, copy all properties from the source objects to target

#### `.createStyles(styles)`

Convert object to valid CSS style string

```js
log.utils.createStyles({}) // ""
log.utils.createStyles({color: 'red', padding: '20px', 'font-size': '18px'}) // "color:red;padding:20px;font-size:18px;"
```

#### `.parseStyles(styles)`

Convert css style string to object

```js
log.utils.parseStyles('color:red;padding:20px;') // {color: "red", padding: "20px"}
```

#### `.divider(text[, symbol, length])`

Create a divider string, support optional symbol and length arguments

```js
log.utils.divider('message')          // "==================== message ===================="
log.utils.divider('message', '-')     // "-------------------- message --------------------"
log.utils.divider('message', 20)      // "===== message ====="
log.utils.divider('message', '-', 20) // "----- message -----"
log.utils.divider('-', 20)            // "-------------------"
log.utils.divider(20, '-')            // "-------------------"
log.utils.divider('-')                // "-------------------------------------------------"
log.utils.divider(20)                 // "==================="
```

#### `.callout(text[, symbol])`

Create an ASCII callout

```js
log.utils.callout('message', '|') // useful for emphasize
```

    | 
    | message
    | 

#### `.box(text[, symbol, padding])`

Create an ASCII box, support optional symbol and padding arguments

```js
log.utils.box('message')
```

    *************
    *           *
    *  message  *
    *           *
    *************

```js
log.utils.box('multiline\nmessage', '#', { left: 3, right: 3 })
```

    #################
    #               #
    #   multiline   #
    #   message     #
    #               #
    #################

- - - - - - -

## Advanced Usage

### Create your own logger

For example you want sent logs to your backend or implement DOM logger

```js
// define simple DOM logger
var DOMLoggerApi = {
    $wrapper: $('#log-wrapper'),
    log: function(message, styles){
    	var $logMessage = $('<span/>')
    	$logMessage.text(message.replace('%c', ''))
    	$logMessage[0].style.cssText = styles
    	this.$wrapper.append($logMessage).append('<hr/>')
    }
}

// extend `log`
log.mixin({
    dom: {
        api: DOMLoggerApi
    }
})

// use it
log.dom.info('text') // will output this message with styles to #log-wrapper
```

### Taking advantage of the fact that `log` is function

```js
log instanceof Function // true
```

That means you can use `.call`, `.apply` and `.bind` for calling `log` with different context.

`log` is smart, so it will use passed context like a custom logger.

For example DOMLoggerApi from example above can be used as follows:

```js
var DOMLogger = { api: DOMLoggerApi }

log.info.call(DOMLogger, 'text')

log.info.apply(DOMLogger, ['text'])

log.info.bind(DOMLogger, 'text')()

DOMLogger.log = log.info
DOMLogger.log('text')

```

