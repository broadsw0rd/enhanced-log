describe('Test Log', function(){
    function createStyles(styles){
        var result = []
        for(var style in styles){
            result.push([style, styles[style]].join(':'))
        }
        return result.join(';') + ';'
    }

    var allStylingMethods = ['large','huge','small','info','success','warning','danger','underline','overline','linethrough','capitalize','uppercase','lowercase','bold','italic']

    it('`log` should be defined', function(){
        expect(log).toBeDefined()
    })

    it('`log` should be a function', function(){
        expect(log instanceof Function).toBe(true)
        expect(log).not.toThrow()
    })

    it('`log` should be instance of Logger', function(){
        expect(log instanceof log.constructor).toBe(true)
    })

    it('`log#styles` should be defined', function(){
        expect(log.styles).toEqual(Object(log.styles))
    })

    it('`log` should log the message if called like a function', function(){
        var flag = 0
        console.log = function(message, style){
            flag = 1
            expect(message).toEqual('%cmessage')
            expect(style).toBeDefined()
        }
        log('message')
        expect(flag).toEqual(1)
        delete console.log
    })

    it('`log` should create new instance of Logger if called like constructor with passed style object', function(){
        var redLargeLog = new log.large({'background-color': 'red'})
        expect(redLargeLog instanceof log.constructor).toBe(true)
        expect(redLargeLog.styles).toEqual({'background-color': 'red', 'font-size': '18px'})
        expect(redLargeLog.bold.styles).toEqual({'background-color': 'red', 'font-size': '18px', 'font-weight': 'bold'})
    })

    it('`log` should create new instance of Logger if called like constructor with passed style string', function(){
        var redLargeLog = new log.large('background-color:red')
        expect(redLargeLog instanceof log.constructor).toBe(true)
        expect(redLargeLog.styles).toEqual({'background-color': 'red', 'font-size': log.defaults.large['font-size']})
        expect(redLargeLog.bold.styles).toEqual({'background-color': 'red', 'font-size': log.defaults.large['font-size'], 'font-weight': log.defaults.bold['font-weight']})

        var mixedLog = new log(log.info + log.uppercase)
        expect(mixedLog.styles).toEqual(log.info.uppercase.styles)
        
        var moreMixedLog = new log(redLargeLog + mixedLog)
        expect(moreMixedLog.styles).toEqual({
            'font-size': log.defaults.large['font-size'],
            'background-color': 'red',
            'color': log.defaults.info.color,
            'text-transform': log.defaults.uppercase['text-transform']
        })
    })

    it('`log` should call `log` method of object with passed message and own styles if applied to this object', function(){
        var flag = 0
        var ownLogger = {
            log: function(message, style){
                expect(message).toEqual('%cmessage')
                expect(style).toEqual(createStyles({color: log.defaults.warning.color}))
                flag = 1
            }
        }

        log.warning.apply(ownLogger, ['message'])
        expect(flag).toBe(1)
    })

    it('`log#toString` should implement String coercion', function(){
        expect(log.toString()).toEqual(createStyles(log.styles))
    })

    it('`log#toJSon` should implement JSON coercion', function(){
        expect(JSON.stringify(log)).toEqual(JSON.stringify(log.styles))
    })

    it('`log#defaults` should be defined', function(){
        expect(log.defaults).toBeDefined()
    })

    it('`log#defaults` should have styles for all styling methods', function(){
        allStylingMethods.forEach(function (method){
            expect(log.defaults[method]).toBeDefined()
        })
    })

    for(var method in log.defaults){
        it('`log#' + method + '` should be defined and return new instance of Logger', function(){
            expect(log[method] instanceof log.constructor).toBe(true)
            expect(log[method]).not.toBe(log)
            expect(log[method].styles).not.toEqual(log.styles)
            expect(log[method].styles).toEqual(Object(log[method].styles))
            expect(log[method].toString()).toEqual(createStyles(log[method].styles))
            expect(log[method]).not.toThrow()
        })
    }

    it('`log#off` should disabling logging', function(){
        console.log = function(message, style){
            throw Error()
        }
        log.off()
        expect(log).not.toThrow()
        delete console.log
    })

    it('`log#on` should enabling logging', function(){
        console.log = function(message, style){
            throw Error()
        }
        log.off()
        expect(log).not.toThrow()
        delete console.log
        log.on()
        var flag = 0
        console.log = function(message, style){
            flag = 1
            expect(message).toEqual('%cmessage')
            expect(style).toBeDefined()
        }
        log('message')
        expect(flag).toEqual(1)
        delete console.log
    })

    it('`log#toggle` should toggle logging', function(){
        console.log = function(message, style){
            throw Error()
        }
        log.toggle()
        expect(log).not.toThrow()
        delete console.log
        log.toggle()
        var flag = 0
        console.log = function(message, style){
            flag = 1
            expect(message).toEqual('%cmessage')
            expect(style).toBeDefined()
        }
        log('message')
        expect(flag).toEqual(1)
        delete console.log
    })

    it('`log#toggle` should on or off logging depending on passed argument', function(){        
        log.toggle(true)
        var flag = 0
        console.log = function(message, style){
            flag = 1
            expect(message).toEqual('%cmessage')
            expect(style).toBeDefined()
        }
        log('message')
        expect(flag).toEqual(1)
        delete console.log
        console.log = function(message, style){
            throw Error()
        }
        log.toggle(false)
        expect(log).not.toThrow()
        delete console.log
    })

    it('`log#mixin` slould create new styling method', function(){
        log.mixin({
            bgInfo: {'background-color': '#73beff'}
        })

        expect(log.bgInfo instanceof log.constructor).toBe(true)
        expect(log.bgInfo.styles).toEqual({'background-color': '#73beff'})
    })

    it('Changing the defaults styles options should automaticly applied to styling method', function(){
        for(var prop in log.defaults){
            log.defaults[prop].test = 'test'
        }

        for(var prop in log.defaults){
            expect(log[prop].styles.test).toEqual('test')
        }
    })
})