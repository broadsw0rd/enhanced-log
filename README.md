# Enhanced Log

>Amazing, flexible, extendable wrapper for `console.log` for enhance [styling console output](https://developer.chrome.com/devtools/docs/console#styling-console-output-with-css)

[![Build Status](https://travis-ci.org/broadsw0rd/enhanced-log.svg?branch=master)](https://travis-ci.org/broadsw0rd/enhanced-log)

## Install

## Usage

Browserify:

```js
var log = require('enhanced-log')
```

Browser: 

```html
<script src="log.min.js">
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

## API

### log.`<style>[.<style>...](message)`

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
- `logo`
- `divider`
- `callout`

This methods very similar to CSS classes: 

- each can apply defined styles to output

```js
log.large      // font-size:18px;
log.info       // color:#03a9f4;
log.large.info // color:#03a9f4;font-size:18px;
```

- order doesn't matter

```js
log.info.large // same styles as `log.large.info`
```

- in case of conflict last override previous

```js
log.small.large.huge // equal to log.huge
```

#### Few words about `callout` and `divider`

These two methods are modify log string:

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

### log.styles

### log.mapper(message)

### log.api

### log.method

### log.toString()

### log.toJSON()

### log.on()

### log.off()

### log.toggle(state)

### log.defaults

### log.mixin()

### log.utils

## Advanced Usage
