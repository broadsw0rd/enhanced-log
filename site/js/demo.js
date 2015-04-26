log.mixin({
// just logo
    logo: { 
        styles:{
            'font-size':'46px'
        ,   'font-family': 'Roboto, Helvetica, sans-serif'
        ,   'color': '#FFF'
        ,   'padding':'20px'
        ,   'line-height':'110px'
        ,   'background-color':'#4CAF50'
        }
    }

,   muted: {
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
        return styles.pre || styles
    })
    highlighting.unshift(log.preStart)
    highlighting.push(log.preEnd)
    console.log.apply(console, [message].concat(highlighting))
}

var defaultDivider = log.utils.divider('-', 80)

// -------------------------------------

log.logo('Enhanced Log')
log.callout.muted('Amazing, flexible, extendable library for enhance styling console output')
log.muted(defaultDivider)

// -------------------------------------

logPre('%clog(%c"simple message"%c)', [log.natives, log.string, log])

log('simple message')

log.muted(defaultDivider)

// -------------------------------------

logPre('%clog%c.large.capitalize.info(%c"styled message"%c)', [log.natives, log, log.string, log])

log.large.capitalize.info('styled message')

log.muted(defaultDivider)

// -------------------------------------

logPre('%clog%c.large.success(%c"formatted %s %s %s"%c, %c"styled"%c, %c"message"%c, %c14%c)', [log.natives, log, log.string, '%s', '%s', '%d', log, log.string, log, log.string, log, log.keyword, log])

log.large.success('formatted %s %s %d', 'styled', 'message', 14)

log.muted(defaultDivider)

// -------------------------------------

logPre('%clog%c.info.divider(%c"ASCII divider"%c)', [log.natives, log, log.string, log])

log.info.divider('ASCII divider')

log.muted(defaultDivider)

// -------------------------------------

logPre('%clog%c.warning.callout(%c"ASCII callout"%c)', [log.natives, log, log.string, log])

log.warning.callout('ASCII callout')

log.muted(defaultDivider)

// -------------------------------------

logPre('%clog%c.danger.box(%c"ASCII box"%c)', [log.natives, log, log.string, log])

log.danger.box('ASCII box')

log.muted(defaultDivider)

// -------------------------------------

log.large('...')
log.large.info('More info: https://github.com/broadsw0rd/enhanced-log')

