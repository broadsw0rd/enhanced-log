describe('Test Log', function(){
    function createStyles(styles){
        var result = []
        for(var style in styles){
            result.push([style, styles[style]].join(':'))
        }
        return result.join(';') + ';'
    }

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

    it('`log` should have styles object property', function(){
        expect(log.styles).toEqual(Object(log.styles))
    })

    it('`log` should have String coercion', function(){
        expect(log.toString()).toEqual(createStyles(log.styles))
    })

    it('`log` should have JSON coercion', function(){
        expect(JSON.stringify(log)).toEqual(JSON.stringify(log.styles))
    })

    for(var method in log.defaults){
        it('`log` should have chainable method "' + method + '" which return new instance of Logger', function(){
            expect(log[method] instanceof log.constructor).toBe(true)
            expect(log[method]).not.toBe(log)
            expect(log[method].styles).not.toEqual(log.styles)
            expect(log[method].styles).toEqual(Object(log[method].styles))
            expect(log[method].toString()).toEqual(createStyles(log[method].styles))
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
})