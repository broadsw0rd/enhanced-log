;(function (global, Object, prototype, __proto__){

    // =====================================
    // Private interface
    // =====================================

    var enabled = true

    function _log(message, logger){
        enabled && logger.api[logger.method]('%c' + logger.mapper(message), _createStyles(logger.styles))
    }

    // -------------------------------------
    // Utils
    // -------------------------------------

    function _id(arg){
        return arg
    }

    function _result(arg){
        return typeof arg == 'function' ? arg() : arg
    }
    
    function _extend(target, source){
        for(var i = 1; i < arguments.length; i++){
            source = arguments[i]
            for(var prop in source){
                target[prop] = source[prop]
            }
        }
        return target
    }

    // {'color': '#C7254E','background-color': '#F9F2F4'} => "color:#C7254E;background-color:#F9F2F4;"
    function _createStyles(styles){
        styles = JSON.stringify(styles).replace(/[{}"]/g, '').replace(',', ';')
        return styles ? styles + ';' : ''
    }

    // "color:#C7254E;background-color:#F9F2F4;" => {'color': '#C7254E','background-color': '#F9F2F4'}
    function _parseStyles(styles){
        return styles.replace(/\s+/g, '').replace(/;$/, '').split(';').reduce(function (acc, style){
            if(style) acc[style = style.split(':'), style[0]] = style[1]
            return acc
        }, {})
    }

    // -------------------------------------
    // Divider
    // -------------------------------------
 
    var DEFAULT_DIVIDER_LENGTH = 50
    ,   DEFAULT_DIVIDER_SYMBOL = '='
 
    function _divider(text, symbol, length){
        length = length || DEFAULT_DIVIDER_LENGTH
        symbol = symbol || DEFAULT_DIVIDER_SYMBOL
        if(typeof text == 'number'){
            length = text
            text = null
        }
        if(/^\W+$/.test(text)){
            if(typeof symbol == 'number'){
                length = symbol
            }
            symbol = text
            text = null
        }
        if(text){
            if(typeof symbol == 'number'){
                length = symbol
                symbol = DEFAULT_DIVIDER_SYMBOL
            }
            if(/\n/.test(text)){
                return text.replace('\r', '').split('\n').map(function (text){
                    return _divider(text, symbol, length)
                }).join('\n')
            }
            else {
                length = Math.ceil((length - (text.length + 2)) / 2)
                
                var start = Array(length).join(symbol)
                ,   end = Array(length).join(symbol)
 
                return [start, text, end].join(' ')                
            }
        }
        else {
            return Array(length).join(symbol)
        }
    }

    // -------------------------------------
    // Callout
    // -------------------------------------
 
    var DEFAULT_CALLOUT_SYMBOL = String.fromCharCode(9612)
 
    function _callout(message, symbol){
        symbol = symbol || DEFAULT_CALLOUT_SYMBOL
        if(/\n/.test(message)){
            return [
                    '\t' + symbol
                ,   message.replace('\r', '').split('\n').map(function (message){ return '\t' + symbol + ' ' + message }).join('\r\n')
                ,   '\t' + symbol
                ].join('\r\n')
        }
        else {            
            return [
                    '\t' + symbol
                ,   '\t' + symbol + ' ' + message
                ,   '\t' + symbol
                ].join('\r\n')
        }
    }

    // =====================================
    // Constructor
    // =====================================

    function LogFactory(base){
        function log(message){
            'use strict';
        }

        log[__proto__] = base

        return log
    }

    // =====================================
    // Public interface
    // =====================================

    var utils = {
            id: _id
        ,   result: _result
        ,   extend: _extend
        ,   createStyles: _createStyles
        ,   parseStyles: _parseStyles
        ,   divider: _divider
        ,   callout: _callout
        }

    var defaults = {
            large: { 'font-size'  : '18px' }
        ,   huge : { 'font-size'  : '24px' }
        ,   small: { 'font-size'  : '10px' }
 
        ,   info   : { 'color' : '#03a9f4' }
        ,   success: { 'color' : '#259b24' }
        ,   warning: { 'color' : '#ff9800' }
        ,   danger : { 'color' : '#e51c23' }
 
        ,   underline  : { 'text-decoration': 'underline'    }
        ,   overline   : { 'text-decoration': 'overline'     }
        ,   linethrough: { 'text-decoration': 'line-through' }
 
        ,   capitalize: { 'text-transform': 'capitalize' }
        ,   uppercase : { 'text-transform': 'uppercase'  }
        ,   lowercase : { 'text-transform': 'lowercase'  }
 
        ,   bold  : { 'font-weight': 'bold' }
        ,   italic: { 'font-style': 'italic' }
 
        // like bootstrap <code>...<code/>
        ,   code: {
                'color': '#C7254E',
                'background-color': '#F9F2F4'
            }

        // just logo
        ,   logo: {
                'font-size':'46px'
            ,   'font-family': 'Roboto, Helvetica, sans-serif'
            ,   'color': '#FFEB3B'
            ,   'padding':'20px'
            ,   'line-height':'110px'
            ,   'background-color':'#212121;'
            }
        }

    var proto = _extend(Object.create(Function[prototype]), {
            mapper: _id
        ,   styles: {}
        ,   method: 'log'
        ,   api: console
        ,   utils: utils
        ,   defaults: defaults
        ,   toString: function (){ return _createStyles(this.styles) }
        ,   toJSON: function (){ return this.styles }
        ,   on: function (){ enabled = true }
        ,   off: function (){ enabled = false }
        ,   toggle: function (enable){ enabled = enable !== void 0 ? enable : !enabled }
        ,   constructor: LogFactory
        })

    // =====================================
    // Export
    // =====================================

    if (typeof define == 'function' && define.amd) {
        define(function() { return LogFactory(proto) })
    } 
    else if (typeof module != 'undefined' && module.exports) {
        module.exports = LogFactory(proto)
    } 
    else {
        global.log = LogFactory(proto)
    }

}(this, Object, 'prototype', '__proto__'))