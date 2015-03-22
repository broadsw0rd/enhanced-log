# Enhanced Log

>Amazing, flexible, extendable wrapper for `console.log`

[![Build Status](https://travis-ci.org/broadsw0rd/enhanced-log.svg?branch=master)](https://travis-ci.org/broadsw0rd/enhanced-log)

## About

Robust wrapper for `console.log` for enhance [styling console output](https://developer.chrome.com/devtools/docs/console#styling-console-output-with-css) 

## Install

## Usage

Browserify:

    var log = require('enhanced-log')

Browser: 

    <script src="log.min.js">

`log` has several chainable methods for styling your console output:

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

## API

## Advanced Usage
