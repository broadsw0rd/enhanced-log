;(function (global, Object, prototype, __proto__){

    // =====================================
    // Private interface
    // =====================================

    function extend(target, source){
        for(var prop in source){
            target[prop] = source[prop]
        }
        return target
    }

    function createStyles(styles){
        return Object.keys(styles).reduce(function (acc, style){
            return acc.push([style, styles[style]].join(':')), acc
        }, []).join(';') + ';'
    }

    function parseStyles(styles){
        return styles.replace(/;$/, '').split(';').reduce(function (acc, style){
            return acc[style = style.split(':'), style[0]] = style[1], acc
        }, {})
    }

    var enabled = true

    // =====================================
    // Constructor
    // =====================================

    function Logger(styles){
        styles = styles || {}

        // Polymorph log function
        function log(message){ 
            'use strict';
            if(!this || this instanceof Logger || this == global){ // Phantomjs behaves strangely: even with 'use strict'; `this` refer to `window`
                enabled && console.log('%c' + message, createStyles(log.styles))
            }
            else if(this instanceof log){
                return Logger(extend(extend({}, log.styles), typeof message == 'string' ? parseStyles(message) : message))
            }
            else {
                this.log('%c' + message, createStyles(log.styles))
            }
            
        }

        log[__proto__] = LogProto

        log.styles = styles

        return log
    }

    // =====================================
    // Public interface
    // =====================================

    var LogProto = Logger[prototype]

    function mixin(styles){
        var source = {}
        for(var style in styles){
            !function (name, value){
                source[name] = {
                    get: function(){
                        return Logger(extend(extend({}, this.styles), value))
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

    extend(LogProto, {
        defaults: defaults
    ,   mixin: mixin
    ,   toString: function (){ return createStyles(this.styles) }
    ,   toJSON: function (){ return this.styles }
    ,   on: function (){ enabled = true }
    ,   off: function (){ enabled = false }
    ,   toggle: function (enable){ enabled = enable !== void 0 ? enable : !enabled }
    })

    LogProto[__proto__] = Function[prototype]

    mixin(defaults)

    // =====================================
    // Export
    // =====================================

    if (typeof define == 'function' && define.amd) {
        define(function() { return Logger() })
    } 
    else if (typeof module != 'undefined' && module.exports) {
        module.exports = Logger()
    } 
    else {
        global.log = Logger()
    }
}(window, Object, 'prototype', '__proto__'))