;(function (global, console){
    function extend(target, source){
        for(var i = 1; i < arguments.length; i++){
            source = arguments[i]
            for(var prop in source){
                target[prop] = source[prop]
            }
        }
        return target
    }

    function createStyles(styles){
        return Object.keys(styles).reduce(function(acc, style){
            return acc.push([style, styles[style]].join(':')), acc
        }, []).join(';')
    }

    var enabled = true
    
    function Logger(styles){
        styles = styles || {}

        function log(message){
            'use strict';
            enabled && (this && this.log ? this : console).log('%c' + message, createStyles(log.styles))
        }

        log.__proto__ = LogProto

        log.styles = styles

        return log
    }

    function mixin(styles){
        var source = {}
        for(var style in styles){
            !function (name, value){
                source[name] = {
                    get: function(){
                        return Logger(extend({}, this.styles, value))
                    }
                }
            }(style, styles[style])
        }
        Object.defineProperties(LogProto, source)
    }

    var defaults = {
            large: { 'font-size'  : '18px'    }
        ,   huge : { 'font-size'  : '24px'    }
        ,   small: { 'font-size'  : '10px'    }

        ,   info   : { color : '#0074D9' }
        ,   success: { color : '#2ECC40' }
        ,   warning: { color : '#FF851B' }
        ,   danger : { color : '#FF4136' }

        ,   underline  : { 'text-decoration': 'underline'    }
        ,   overline   : { 'text-decoration': 'overline'     }
        ,   linethrough: { 'text-decoration': 'line-through' }

        ,   capitalize: { 'text-transform': 'capitalize' }
        ,   uppercase : { 'text-transform': 'uppercase'  }
        ,   lowercase : { 'text-transform': 'lowercase'  }

        ,   bold: { 'font-weight': 'bold' }
        ,   italic: { 'font-style': 'italic' }
        }

    var LogProto = Logger.prototype

    extend(LogProto, {
        defaults: defaults
    ,   mixin: mixin
    ,   toString: function (){ return createStyles(this.styles) }
    ,   on: function (){ enabled = true }
    ,   off: function (){ enabled = false }
    ,   toggle: function (enable){ enable !== void 0 ? enabled = enable : enabled = !enabled }
    })

    LogProto.__proto__ = Function.prototype

    mixin(defaults)

    if ('function' === typeof define  && define.amd) {
        define(function() { return Logger() })
    } 
    else if ('undefined' !== typeof module && module.exports) {
        module.exports = Logger()
    } 
    else {
        global.log = Logger()
    }
}(window, console))