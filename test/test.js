import * as expect from 'expect.js'
import * as sinon from 'sinon'
import * as log from '../src/log.js'

let defaults = [
        'large'
    ,   'huge'
    ,   'small'
    ,   'info'
    ,   'success'
    ,   'warning'
    ,   'danger'
    ,   'underline'
    ,   'overline'
    ,   'linethrough'
    ,   'capitalize'
    ,   'uppercase'
    ,   'lowercase'
    ,   'bold'
    ,   'italic'
    ,   'code'
    ,   'divider'
    ,   'callout'
    ,   'box'
    ]

beforeEach(() => {
    sinon.spy(console, 'log')
})

afterEach(() => {
    console.log.restore()
})

describe('log', () => {

    it('should be defined', () => {
        expect(log).to.be.ok()
    })

    it('should be a function', () => {
        expect(log).to.be.a(Function)
    })

    it('should call `console.log` with message and styles by default', () => {
        log('message')
        expect(console.log.calledOnce).to.be.ok()
        expect(console.log.getCall(0).args[0]).to.be('%cmessage')
        expect(console.log.getCall(0).args[1]).to.be(log.toString())
    })

    it('should have default styling methods', () => {
        defaults.forEach((method) => {
            expect(log[method]).to.be.ok()
        })
    })

    describe('each of this methods', () => {

        it('should return new instance of `log`', () => {
            defaults.forEach((method) => {
                expect(log[method]).to.be.ok()
                expect(log[method]).to.be.a(Function)
                expect(log[method]).to.be.a(log.constructor)
            })
        })

        it('should call `console.log` with mapped message and own styles', () => {
            defaults.forEach((method, idx) => {
                log[method]('message')
                expect(console.log.getCall(idx).args[0]).to.be('%c' + log[method].mapper('message'))
                expect(console.log.getCall(idx).args[1]).to.be(log[method].toString())
            })
        })

        it('should correct converts to String', () => {
            defaults.forEach((method, idx) => {
                expect(log[method].toString()).to.be(log.utils.createStyles(log.utils.result(log[method].styles)))
            })
        })

        it('should correct converts to JSON', () => {
            defaults.forEach((method, idx) => {
                expect(log[method].toJSON()).to.eql(log.utils.result(log[method].styles))
            })
        })

        it('should be chainable', () => {
            log.large.danger.capitalize('message')
            expect(console.log.getCall(0).args[0]).to.be('%cmessage')
            expect(console.log.getCall(0).args[1]).to.be(log.large.danger.capitalize.toString())

            log.divider.box.callout('message')
            expect(console.log.getCall(1).args[0]).to.be('%c' + log.divider.box.callout.mapper('message'))
            expect(console.log.getCall(1).args[1]).to.be(log.divider.box.callout.toString())

            log.divider.info('message')
            expect(console.log.getCall(2).args[0]).to.be('%c' + log.divider.info.mapper('message'))
            expect(console.log.getCall(2).args[1]).to.be(log.divider.info.toString())
        })

        it('should correct override css properties', () => {
            expect(log.small.large.huge.toString()).to.be(log.huge.toString())
        })
    })

    it('should support multiple argments', () => {
        log('multiple', 'arguments')
        expect(console.log.getCall(0).args[0]).to.be('%cmultiple')
        expect(console.log.getCall(0).args[1]).to.be('')
        expect(console.log.getCall(0).args[2]).to.be('arguments')

        log.info('multiple', 'arguments')
        expect(console.log.getCall(1).args[0]).to.be('%cmultiple')
        expect(console.log.getCall(1).args[1]).to.be(log.info.toString())
        expect(console.log.getCall(0).args[2]).to.be('arguments')
    })

    it('should support native format specifiers', () => {
        log('format %d', 14);
        expect(console.log.getCall(0).args[0]).to.be('%cformat %d')
        expect(console.log.getCall(0).args[1]).to.be('')
        expect(console.log.getCall(0).args[2]).to.be(14)

        log('format %d %s', 14, 'text');
        expect(console.log.getCall(1).args[0]).to.be('%cformat %d %s')
        expect(console.log.getCall(1).args[1]).to.be('')
        expect(console.log.getCall(1).args[2]).to.be(14)
        expect(console.log.getCall(1).args[3]).to.be('text')

        log.info('format %d %s', 14, 'text');
        expect(console.log.getCall(2).args[0]).to.be('%cformat %d %s')
        expect(console.log.getCall(2).args[1]).to.be(log.info.toString())
        expect(console.log.getCall(2).args[2]).to.be(14)
        expect(console.log.getCall(2).args[3]).to.be('text')
    })

    describe('should correct work with custom context', () => {
        let customLogger = {
                styles: {
                    border: '1px solid red'
                }
            ,   mapper: (message) => `(${message})`
            ,   method: 'warn'
            ,   api: console
            }

        beforeEach(() => {
            sinon.spy(customLogger.api, 'warn')
        })

        afterEach(() => {
            customLogger.api.warn.restore()
        })

        it('.call should call log instance with custom logger like a context', () => {
            log.call(customLogger, 'message')
            expect(customLogger.api.warn.calledOnce).to.be.ok()
            expect(customLogger.api.warn.getCall(0).args[0]).to.be('%c(message)')
            expect(customLogger.api.warn.getCall(0).args[1]).to.be(log.utils.createStyles(customLogger.styles))

            log.large.warning.call(customLogger, 'message')
            expect(customLogger.api.warn.calledTwice).to.be.ok()
            expect(customLogger.api.warn.getCall(1).args[0]).to.be('%c(message)')
            expect(customLogger.api.warn.getCall(1).args[1]).to.be(log.utils.createStyles(log.utils.extend({}, log.large.warning.styles(), customLogger.styles)))
        })

        it('.apply should call log instance with custom logger like a context', () => {
            log.apply(customLogger, ['message'])
            expect(customLogger.api.warn.calledOnce).to.be.ok()
            expect(customLogger.api.warn.getCall(0).args[0]).to.be('%c(message)')
            expect(customLogger.api.warn.getCall(0).args[1]).to.be(log.utils.createStyles(customLogger.styles))

            log.large.warning.apply(customLogger, ['message'])
            expect(customLogger.api.warn.calledTwice).to.be.ok()
            expect(customLogger.api.warn.getCall(1).args[0]).to.be('%c(message)')
            expect(customLogger.api.warn.getCall(1).args[1]).to.be(log.utils.createStyles(log.utils.extend({}, log.large.warning.styles(), customLogger.styles)))
        })

        it('.bind should return log instance bounded to custom logger like a context', () => {
            let customLog = log.bind(customLogger, 'message')
            customLog()
            expect(customLogger.api.warn.calledOnce).to.be.ok()
            expect(customLogger.api.warn.getCall(0).args[0]).to.be('%c(message)')
            expect(customLogger.api.warn.getCall(0).args[1]).to.be(log.utils.createStyles(customLogger.styles))

            customLog = log.large.warning.bind(customLogger, 'message')
            customLog()
            expect(customLogger.api.warn.calledTwice).to.be.ok()
            expect(customLogger.api.warn.getCall(1).args[0]).to.be('%c(message)')
            expect(customLogger.api.warn.getCall(1).args[1]).to.be(log.utils.createStyles(log.utils.extend({}, log.large.warning.styles(), customLogger.styles)))
        })

        describe('when log instance is a property of some object', () => {
            it('should use this object like a custom logger', () => {
                customLogger.log = log

                customLogger.log('message')
                expect(customLogger.api.warn.calledOnce).to.be.ok()
                expect(customLogger.api.warn.getCall(0).args[0]).to.be('%c(message)')
                expect(customLogger.api.warn.getCall(0).args[1]).to.be(log.utils.createStyles(customLogger.styles))

                customLogger.log = log.large.warning
                customLogger.log('message')
                expect(customLogger.api.warn.calledTwice).to.be.ok()
                expect(customLogger.api.warn.getCall(1).args[0]).to.be('%c(message)')
                expect(customLogger.api.warn.getCall(1).args[1]).to.be(log.utils.createStyles(log.utils.extend({}, log.large.warning.styles(), customLogger.styles)))
            })
        })
    })

    describe('.mapper()', () => {
        it('should be a function', () => {
            expect(log.mapper).to.be.a(Function)
        })

        it('should be a placeholder by default', () => {
            let target = {}
            expect(log.mapper(target)).to.be(target)
        })
    })

    describe('.styles', () => {
        it('should be an object', () => {
            expect(log.styles).to.be.an(Object)
        })

        it('should be empty by default', () => {
            expect(log.styles).to.be.empty()
        })
    })

    describe('.method', () => {
        it('should be "log" by default', () => {
            expect(log.method).to.be('log')
        })
    })

    describe('.api', () => {
        it('should be `console` by default', () => {
            expect(log.api).to.be(console)
        })
    })

    describe('.toString()', () => {
        it('should be a function', () => {
            expect(log.toString).to.be.a(Function)
        })

        it('should stringify `log.styles`', () => {
            expect(log.toString()).to.be('')
        })
    })

    describe('.toJSON()', () => {
        it('should be a function', () => {
            expect(log.toJSON).to.be.a(Function)
        })

        it('should return `log.styles`', () => {
            expect(log.toJSON()).to.be(log.styles)
        })
    })

    describe('.on()', () => {
        beforeEach(() => {
            log.off()
        })

        it('should be a function', () => {
            expect(log.on).to.be.a(Function)
        })

        it('should enable logging', () => {
            log('missing message')
            log.on()
            log('message')
            expect(console.log.calledOnce).to.be.ok()
            expect(console.log.getCall(0).args[0]).to.be('%cmessage')
        })
    })

    describe('.off()', () => {
        afterEach(() => {
            log.on()
        })

        it('should be a function', () => {
            expect(log.off).to.be.a(Function)
        })

        it('should disable logging', () => {
            log('message')
            log.off()
            log('missing message')
            expect(console.log.calledOnce).to.be.ok()
            expect(console.log.getCall(0).args[0]).to.be('%cmessage')
        })
    })

    describe('.toggle()', () => {
        afterEach(() => {
            log.on()
        })

        it('should be a function', () => {
            expect(log.toggle).to.be.a(Function)
        })

        it('should toggle logging', function(){
            log('first call')
            log.toggle()
            log('missed call')
            log.toggle()
            log('second call')
            log.toggle(true)
            log('third call')
            log.toggle(false)
            log('missed call')
            expect(console.log.callCount).to.be(3)
            expect(console.log.getCall(0).args[0]).to.be('%cfirst call')
            expect(console.log.getCall(1).args[0]).to.be('%csecond call')
            expect(console.log.getCall(2).args[0]).to.be('%cthird call')
        })
    })

    describe('.defaults', () => {
        it('should be an object', () => {
            expect(log.defaults).to.be.an(Object)
        })

        it('should have properties equals each styling methods', () => {
            expect(log.defaults).to.only.have.keys(defaults)
        })

        describe('changing any property of `log.defaults`', () => {
            let oldColor = log.defaults.danger.styles.color
            
            before(() => {
                log.defaults.danger.styles.color = '.fff'
                log.defaults.danger.styles.border = '1px solid red'
            })
            
            after(() => {
                log.defaults.danger.styles.color = oldColor
                delete log.defaults.danger.styles.border
            })

            it('should change those method behaviour', () => {
                log.danger('message')
                expect(console.log.getCall(0).args[0]).to.be('%cmessage')
                expect(console.log.getCall(0).args[1]).to.be(log.utils.createStyles(log.defaults.danger.styles))
            })
        })
    })

    describe('.mixin()', () => {
        afterEach(() => {
            delete log.constructor.prototype.test
        })

        it('should add chainable styling method to prototype', () => {
            let logger = {
                    styles: {
                        color: 'red'
                    }
                ,   mapper: (arg) => `(${arg})`
                }

            log.mixin({ test: logger })

            log.capitalize.test.large('message')
            expect(console.log.getCall(0).args[0]).to.be('%c(message)')
            expect(console.log.getCall(0).args[1]).to.be(log.capitalize.test.large.toString())
        })

        it('should correct inherit styling property even if `style` is a function', () => {
            let logger = {
                    styles: () => ({ color: 'red' })
                ,   mapper: (arg) => `(${arg})`
                }

            log.mixin({ test: logger })

            log.capitalize.test.large('message')
            expect(console.log.getCall(0).args[0]).to.be('%c(message)')
            expect(console.log.getCall(0).args[1]).to.be(log.capitalize.test.large.toString())
        })

        it('should support optional `api` and `method` properties', () => {
            let logger = {
                    styles: {
                        color: 'red'
                    }
                ,   mapper: (arg) => `(${arg})`
                ,   method: 'method'
                ,   api: {
                        method: () => {}
                    }
                }

            sinon.spy(logger.api, 'method')

            log.mixin({ test: logger })

            log.test('message')

            expect(logger.api.method.calledOnce).to.be.ok()
            expect(logger.api.method.getCall(0).args[0]).to.be('%c(message)')
            expect(logger.api.method.getCall(0).args[1]).to.be(log.utils.createStyles(logger.styles))
        })

        it('should add mixed properties to `log.defaults`', () => {
            let logger = {
                    styles: {
                        color: 'red'
                    }
                ,   mapper: (arg) => `(${arg})`
                ,   method: 'method'
                ,   api: {
                        method: () => {}
                    }
                }

            log.mixin({ test: logger })
            expect(log.defaults.test).to.be(logger)
        })
    })

    describe('.utils', () => {

        it('should be an object', () => {
            expect(log.utils).to.be.an(Object)
        })

        describe('.id()', () => {
            it('should be a function', () => {
                expect(log.utils.id).to.be.a(Function)
            })

            it('should be a placeholder', () => {
                let target = {}
                expect(log.utils.id(target)).to.be(target)
            })
        })

        describe('.result()', () => {
            it('should be a function', () => {
                expect(log.utils.id).to.be.a(Function)
            })

            it('should return result of function call if passed function otherwise return passing value', () => {
                let target = {}
                expect(log.utils.result(target)).to.be(target)
                expect(log.utils.result(() => { return target })).to.be(target)
            })
        })

        describe('.compose()', () => {
            it('should be a function', () => {
                expect(log.utils.compose).to.be.a(Function)
            })

            it('should compose functions', () => {
                let f = (x) => x*2
                ,   g = (x) => x+2

                expect(log.utils.compose(f, g)(2)).to.be(8)
                expect(log.utils.compose(g, f)(2)).to.be(6)
            })
        })

        describe('.extend()', () => {
            it('should be a function', () => {
                expect(log.utils.extend).to.be.a(Function)
            })

            it('should copy the values of all enumerable properties from one or more source objects to a target object and return it', () => {
                let target = {}
                log.utils.extend(target, {test: 'test', value: 'value'})
                expect(target).to.have.property('test', 'test')
                expect(target).to.have.property('value', 'value')

                expect(log.utils.extend({}, {test: 'test'})).to.have.property('test', 'test')

                target = log.utils.extend({}, {a: 'a'}, {b: 'b'}, {c: 'c'})
                expect(target).to.have.property('a', 'a')
                expect(target).to.have.property('b', 'b')
                expect(target).to.have.property('c', 'c')

                target = log.utils.extend({a: 'a'}, {a: 'b'}, {b: 'b'}, {b: 'c'})
                expect(target).to.have.property('a', 'b')
                expect(target).to.have.property('b', 'c')
            })
        })

        describe('.createStyles()', () => {
            it('should be a function', () => {
                expect(log.utils.createStyles).to.be.a(Function)
            })

            it('should convert object to valid css style string', () => {
                expect(log.utils.createStyles({})).to.be('')
                expect(log.utils.createStyles({color: 'red'})).to.be('color:red;')
                expect(log.utils.createStyles({color: 'red', padding: '20px'})).to.be('color:red;padding:20px;')
                expect(log.utils.createStyles({color: 'red', padding: '20px', 'font-size': '18px'})).to.be('color:red;padding:20px;font-size:18px;')
            })
        })

        describe('.parseStyles()', () => {
            it('should be a function', () => {
                expect(log.utils.parseStyles).to.be.a(Function)
            })

            it('should convert css style string to object', () => {
                expect(log.utils.parseStyles('')).to.eql({})
                expect(log.utils.parseStyles(';')).to.eql({})
                expect(log.utils.parseStyles('color:red')).to.have.property('color','red')
                expect(log.utils.parseStyles('color:red;padding:20px;')).to.only.have.keys('color', 'padding')
                expect(log.utils.parseStyles('color: red; padding: 20px; \tfont-size: 100%')).to.only.have.keys('color', 'padding', 'font-size')
            })
        })

        describe('.divider()', () => {
            it('should be a function', () => {
                expect(log.utils.divider).to.be.a(Function)
            })

            it('should create divider string', () => {
                expect(log.utils.divider()).to.be('==================================================')
                expect(log.utils.divider().length).to.be(50)
            })
            it('should support optional message, symbol and length', () => {
                expect(log.utils.divider('message')).to.be('===================== message =====================')
                expect(log.utils.divider('message').length).to.be(51)

                expect(log.utils.divider('message', '-')).to.be('--------------------- message ---------------------')
                expect(log.utils.divider('message', '-').length).to.be(51)

                expect(log.utils.divider('message', 20)).to.be('====== message ======')
                expect(log.utils.divider('message', 20).length).to.be(21)

                expect(log.utils.divider('message', '-', 20)).to.be('------ message ------')
                expect(log.utils.divider('message', '-', 20).length).to.be(21)

                expect(log.utils.divider('-', 20)).to.be('--------------------')
                expect(log.utils.divider('-', 20).length).to.be(20)

                expect(log.utils.divider(20, '-')).to.be('--------------------')
                expect(log.utils.divider(20, '-').length).to.be(20)

                expect(log.utils.divider('-')).to.be('--------------------------------------------------')
                expect(log.utils.divider('-').length).to.be(50)

                expect(log.utils.divider(20)).to.be('====================')
                expect(log.utils.divider(20).length).to.be(20)
            })
            it('should works well with multiline message', () => {
                expect(log.utils.divider('message\nmessage')).to.be('===================== message =====================\n===================== message =====================')
                expect(log.utils.divider('message\r\nmessage')).to.be('===================== message =====================\n===================== message =====================')
                expect(log.utils.divider('message\n\rmessage')).to.be('===================== message =====================\n===================== message =====================')
            })
        })

        describe('.callout()', () => {
            it('should be a function', () => {
                expect(log.utils.callout).to.be.a(Function)
            })

            it('should create ASCII callout', () => {
                expect(log.utils.callout('callout')).to.be(['\t▌','\t▌ callout','\t▌'].join('\n'))
            })

            it('should support optional symbol', () => {
                expect(log.utils.callout('callout', '|')).to.be(['\t|','\t| callout','\t|'].join('\n'))
            })

            it('should works well with multiline message', () => {
                expect(log.utils.callout('callout\ncallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\n'))
                expect(log.utils.callout('callout\r\ncallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\n'))
                expect(log.utils.callout('callout\n\rcallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\n'))
            })
        })

        describe('.box()', () => {
            it('should be a function', () => {
                expect(log.utils.box).to.be.a(Function)
            })

            it('should create ASCII box', () => {
                expect(log.utils.box('message'))
                    .to.be('\t' + [
                        '*************'
                    ,   '*           *'
                    ,   '*  message  *'
                    ,   '*           *'
                    ,   '*************'
                    ].join('\n\t'))
            })

            it('should support optional symbol and padding object', () => {
                expect(log.utils.box('message', '#'))
                    .to.be('\t' + [
                        '#############'
                    ,   '#           #'
                    ,   '#  message  #'
                    ,   '#           #'
                    ,   '#############'
                    ].join('\n\t'))

                let padding = {
                        top: 2,
                        bottom: 2,
                        left: 3,
                        right: 3
                    }

                expect(log.utils.box('message', padding))
                    .to.be('\t' + [
                        '***************'
                    ,   '*             *'
                    ,   '*             *'
                    ,   '*   message   *'
                    ,   '*             *'
                    ,   '*             *'
                    ,   '***************'
                    ].join('\n\t'))

                expect(log.utils.box('message', '#', padding))
                    .to.be('\t' + [
                        '###############'
                    ,   '#             #'
                    ,   '#             #'
                    ,   '#   message   #'
                    ,   '#             #'
                    ,   '#             #'
                    ,   '###############'
                    ].join('\n\t'))

                expect(log.utils.box('message', { left: 1, right: 1 }))
                    .to.be('\t' + [
                        '***********'
                    ,   '*         *'
                    ,   '* message *'
                    ,   '*         *'
                    ,   '***********'
                    ].join('\n\t'))
            })

            it('should works well with multiline message', () => {
                expect(log.utils.box('message\ntext'))
                    .to.be('\t' + [
                        '*************'
                    ,   '*           *'
                    ,   '*  message  *'
                    ,   '*  text     *'
                    ,   '*           *'
                    ,   '*************'
                    ].join('\n\t'))
            })
        })
    })
})