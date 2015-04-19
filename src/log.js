/*
    ______      __                              __   __               
   / ____/___  / /_  ____ _____  ________  ____/ /  / /   ____  ____ _
  / __/ / __ \/ __ \/ __ `/ __ \/ ___/ _ \/ __  /  / /   / __ \/ __ `/
 / /___/ / / / / / / /_/ / / / / /__/  __/ /_/ /  / /___/ /_/ / /_/ / 
/_____/_/ /_/_/ /_/\__,_/_/ /_/\___/\___/\__,_/  /_____/\____/\__, /  
                                                             /____/   
*/
;(function umd(name, root, factory){
    /* istanbul ignore next */
    if (typeof module !== 'undefined' && module.exports) { 
        module.exports = factory() 
    }
    else if (typeof define === 'function' && define.amd) { 
        define(factory) 
    }
    else { 
        root[name] = factory() 
    }
}('log', this, function factory(){

return function scope(global, Object, Array, prototype, __proto__){

    // =====================================
    // Private interface
    // =====================================

    var _map = Array[prototype].map

    var enabled = true

    function _log(message, logger){
        if(enabled) {
            logger.api[logger.method]('%c' + logger.mapper(message), _createStyles(_result(logger.styles)))
        }
    }

    function _inherit(parent, child){
        return _extend(Object.create(parent), child, {
                    styles: _compose(_spreadExtend, _map.bind([{}, parent.styles, child.styles || {}], _result))
                ,   mapper: _compose(child.mapper || _id, parent.mapper)
                })
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

    function _compose(){
        var functions = Array.apply(null, arguments)
        ,   count = functions.length - 1

        return function composed() {
            for(var i = count, result = functions[i].apply(null, arguments); i--;) {
                result = functions[i].call(null, result)
            }
            return result
        }
    }

    // {'color': '#C7254E','background-color': '#F9F2F4'} => "color:#C7254E;background-color:#F9F2F4;"
    function _createStyles(styles){
        styles = Object.keys(styles).reduce(function (acc, style){
            return acc.push([style, styles[style]].join(':')), acc
        }, []).join(';')
        return styles ? styles + ';' : ''
    }

    // "color:#C7254E;background-color:#F9F2F4;" => {'color': '#C7254E','background-color': '#F9F2F4'}
    function _parseStyles(styles){
        return styles.replace(/;$/, '').split(';').reduce(function (acc, style){
            if(style) {
                style = style.split(':')
                acc[style[0].trim()] = style[1].trim()
            }
            return acc
        }, {})
    }

    var _spreadExtend = Function.apply.bind(_extend, null)

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

            return text.replace('\r', '').split('\n').map(function (text){
                    var len = Math.ceil((length - (text.length + 2)) / 2)
                    ,   start = Array(len + 1).join(symbol)
                    ,   end = Array(len + 1).join(symbol)

                    return [start, text, end].join(' ') 
                }).join('\n')
        }
        else {
            return Array(length + 1).join(symbol)
        }
    }

    // -------------------------------------
    // Callout
    // -------------------------------------
 
    var DEFAULT_CALLOUT_SYMBOL = String.fromCharCode(9612)
 
    function _callout(message, symbol){
        symbol = symbol || DEFAULT_CALLOUT_SYMBOL

        message = message.replace('\r', '').split('\n').map(function (message){ 
                return symbol + ' ' + message 
            }).join('\n\t')

        return [
                '\t' + symbol
            ,   '\t' + message
            ,   '\t' + symbol
            ].join('\n')
    }

    // -------------------------------------
    // Callout
    // -------------------------------------

    var DEFAULT_BOX_SYMBOL = '*'
    ,   DEFAULT_BOX_PADDING = {
            top: 1
        ,   right: 2
        ,   bottom: 1
        ,   left: 2
        }

    function _box(message, symbol, padding){
        symbol = symbol || DEFAULT_BOX_SYMBOL

        if(typeof symbol == 'object'){
            padding = symbol
            symbol = DEFAULT_BOX_SYMBOL
        }

        padding = _extend({}, DEFAULT_BOX_PADDING, padding || {})

        var messages = message.replace('\r', '').split('\n')

        ,   longestMessage = messages.reduce(function (a, b) { return a.length > b.length ? a : b })

        ,   leftPadding = Array(padding.left + 1).join(' ')

        ,   rightPadding = Array(padding.right + 1).join(' ')

        ,   emptyRow = Array(longestMessage.length + 1).join(' ')

        ,   horisontalBorder = Array(longestMessage.length + padding.left + padding.right + 3).join(symbol)

        ,   topSpace = Array.apply(null, { length : padding.top }).map(function(){
                    return symbol + leftPadding + emptyRow + rightPadding + symbol
                }).join('\n\t')

        ,   bottomSpace = Array.apply(null, { length : padding.bottom }).map(function(){
                    return symbol + leftPadding + emptyRow + rightPadding + symbol
                }).join('\n\t')

        messages = messages.map(function (message){
                var postfix = Array(longestMessage.length - message.length + 1).join(' ')
                return symbol + leftPadding + message + postfix + rightPadding + symbol
            }).join('\n\t')

        return [
                '\t' + horisontalBorder
            ,   '\t' + topSpace
            ,   '\t' + messages
            ,   '\t' + bottomSpace
            ,   '\t' + horisontalBorder
            ].join('\n')
    }

    // =====================================
    // Constructor
    // =====================================

    function LogFactory(base){
        base = base || proto

        function log(message){
            'use strict';
            if(this == global || this == void 0 || this instanceof LogFactory){
                _log(message, log)
            }
            else if(this instanceof log){
                // TODO: correct work when call like constructor `new log()`
            }
            else {
                _log(message, _inherit(log, this))
            }
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
        ,   compose: _compose
        ,   extend: _extend
        ,   createStyles: _createStyles
        ,   parseStyles: _parseStyles
        ,   divider: _divider
        ,   callout: _callout
        ,   box: _box
        }

    var defaults = {
            large: { 
                styles: { 
                    'font-size'  : '18px' 
                } 
            }
        ,   huge: { 
                styles: { 
                    'font-size'  : '24px' 
                } 
            }
        ,   small: { 
                styles: { 
                    'font-size'  : '10px' 
                } 
            } 

        ,   info: { 
                styles: { 
                    'color' : '#03a9f4' 
                } 
            }
        ,   success: { 
                styles: { 
                    'color' : '#259b24' 
                } 
            }
        ,   warning: { 
                styles: { 
                    'color' : '#ff9800' 
                } 
            }
        ,   danger: { 
                styles: { 
                    'color' : '#e51c23' 
                } 
            } 

        ,   underline: { 
                styles: { 
                    'text-decoration': 'underline'
                } 
            }
        ,   overline: { 
                styles: { 
                    'text-decoration': 'overline'
                } 
            }
        ,   linethrough: { 
                styles: { 
                    'text-decoration': 'line-through' 
                } 
            } 

        ,   capitalize: { 
                styles: { 
                    'text-transform': 'capitalize' 
                } 
            }
        ,   uppercase: { 
                styles: { 
                    'text-transform': 'uppercase'  
                } 
            }
        ,   lowercase: { 
                styles: { 
                    'text-transform': 'lowercase'  
                } 
            } 

        ,   bold: { 
                styles: { 
                    'font-weight': 'bold'   
                } 
            }
        ,   italic: { 
                styles: { 
                    'font-style' : 'italic' 
                } 
            } 

        // like bootstrap <code>...<code/>
        ,   code: { 
                styles: {
                    'color': '#C7254E'
                ,   'background-color': '#F9F2F4'
                ,   'padding': '0 4px'
                }
            }

        // just logo
        ,   logo: { 
                styles:{
                    'font-size':'46px'
                ,   'font-family': 'Roboto, Helvetica, sans-serif'
                ,   'color': '#FFEB3B'
                ,   'padding':'20px'
                ,   'line-height':'110px'
                ,   'background-color':'#212121;'
                }
            }

        ,   divider: {
                mapper: _divider
            }
        ,   callout: {
                mapper: _callout
            }

        ,   box: {
                mapper: _box
            }
        }

    function mixin(target){
        var source = {}

        function _loop(name, value){
            proto.defaults[name] = value
            source[name] = {
                    get: function get(){ 
                        return LogFactory(_inherit(this, value)) 
                    }
                ,   configurable: true
                }
        }

        for(var prop in target){
            _loop(prop, target[prop])
        }

        Object.defineProperties(proto, source)
    }

    var proto = LogFactory[prototype] = _extend(Object.create(Function[prototype]), {
            mapper: _id
        ,   styles: {}
        ,   method: 'log'
        ,   api: console
        ,   utils: utils
        ,   defaults: {}
        ,   mixin: mixin
        ,   toString: function (){ return _createStyles(_result(this.styles)) }
        ,   toJSON: function (){ return _result(this.styles) }
        ,   on: function (){ enabled = true }
        ,   off: function (){ enabled = false }
        ,   toggle: function (enable){ enabled = enable !== void 0 ? enable : !enabled }
        ,   constructor: LogFactory
        ,   __esModule: true
        })

    mixin(defaults)

    // =====================================
    // Export
    // =====================================

    return LogFactory()

}(this, Object, Array, 'prototype', '__proto__')

}))