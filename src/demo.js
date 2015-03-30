log.mixin({
    muted: {
        styles: {
            'color': '#777'
        }
    }

,   pre: {
        styles: {
            'background-color': '#eee'
        ,   'padding': '16px 0'
        ,   'line-height': '5'
        }
    }

,   preStart: {
        styles: {
            'background-color': '#eee'
        ,   'padding': '16px'
        ,   'padding-right': '0'
        }
    }

,   preEnd: {
        styles: {
            'background-color': '#eee'
        ,   'padding': '16px'
        ,   'padding-left': '0'
        }
    }

,   keyword: {
        styles: {
            'color': '#a71d5d'
        }
    }

,   string: {
        styles: {
            'color': '#183691'
        }
    }

,   natives: {
        styles: {
            'color': '#0086b3'
        }
    }

,   variable: {
        styles: {
            'color': '#ed6a43'
        }
    }

,   comment: {
        styles: {
            'color': '#969896'
        }
    }

,   tag: {
        styles: {
            'color': '#63a35c'
        }
    }

,   attr: {
        styles: {
            'color': '#795da3'
        }
    }
})

function logPre(message, highlighting){
    message = '%c' + message + '%c'
    highlighting = highlighting.map(function (styles){
        return styles.pre
    })
    highlighting.unshift(log.preStart)
    highlighting.push(log.preEnd)
    console.log.apply(console, [message].concat(highlighting))
}

var defaultDivider = log.utils.divider('-', 80)

log.logo('Enhanced Log')
log.callout.muted('Amazing, flexible, extendable library for enhance styling console output')
log.muted(defaultDivider)

log.huge('Install')
log.muted(defaultDivider)

log.huge('Usage')
log('Browserify:')
logPre('%cvar%c log = %crequire%c(%c"enhanced-log"%c)', [log.keyword, log, log.natives, log, log.string, log])
log('Browser:')
logPre('%c<%cscript %csrc=%c"log.min.js"%c>', [log, log.tag, log.attr, log.string, log])
console.log('%clog %chas several chainable methods for styling your console output', log.code, log)
log('You can combine it what you want and enjoy:')
logPre('%clog.large.capitalize.info(%c"message"%c)', [log, log.string, log])
log('Equal:')
logPre('%cconsole.%clog%c(%c"%сmessage"%c, %c"color:#03a9f4;text-transform:capitalize;font-size:18px;"%c)', [
    log.attr
,   log.natives
,   log
,   log.string
,   log
,   log.string
,   log
])
log.large('...')
log.large.info('More info here: https://github.com/broadsw0rd/enhanced-log')

