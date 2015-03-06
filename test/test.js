import expect from 'expect.js'
import log from '../src/log.js'

describe('log', () => {
    it('should be defined', () => {
        expect(log).to.be.ok()
    })

    it('should be a function', () => {
        expect(log).to.be.a(Function)
    })

    describe('#mapper', () => {
        it('should be a function', () => {
            expect(log.mapper).to.be.a(Function)
        })

        it('should be a placeholder by default', () => {
            var target = {}
            expect(log.mapper(target)).to.be(target)
        })
    })

    describe('#styles', () => {
        it('should be an object', () => {
            expect(log.styles).to.be.an(Object)
        })

        it('should be empty by default', () => {
            expect(log.styles).to.be.empty()
        })
    })

    describe('#method', () => {
        it('should be "log" by default', () => {
            expect(log.method).to.be('log')
        })
    })

    describe('#api', () => {
        it('should be `console` by default', () => {
            expect(log.api).to.be(console)
        })
    })

    describe('#toString', () => {
        it('should be a function', () => {
            expect(log.toString).to.be.a(Function)
        })

        it('should stringify `log.styles`', () => {
            expect(log.toString()).to.be('')
        })
    })

    describe('#toJSON', () => {
        it('should be a function', () => {
            expect(log.toJSON).to.be.a(Function)
        })

        it('should return `log.styles`', () => {
            expect(log.toJSON()).to.be(log.styles)
        })
    })

    describe('#on', () => {
        it('should be a function', () => {
            expect(log.on).to.be.a(Function)
        })
    })

    describe('#off', () => {
        it('should be a function', () => {
            expect(log.off).to.be.a(Function)
        })
    })

    describe('#toggle', () => {
        it('should be a function', () => {
            expect(log.toggle).to.be.a(Function)
        })
    })

    describe('#defaults', () => {
        it('should be an object', () => {
            expect(log.defaults).to.be.an(Object)
        })
    })

    describe('#mixin', () => {

    })

    describe('#utils', () => {

        it('should be an object', () => {
            expect(log.utils).to.be.an(Object)
        })

        describe('.id', () => {
            it('should be a function', () => {
                expect(log.utils.id).to.be.a(Function)
            })

            it('should be a placeholder', () => {
                var target = {}
                expect(log.utils.id(target)).to.be(target)
            })
        })

        describe('.result', () => {
            it('should be a function', () => {
                expect(log.utils.id).to.be.a(Function)
            })

            it('should return result of function call if passed function otherwise return passing value', () => {
                var target = {}
                expect(log.utils.result(target)).to.be(target)
                expect(log.utils.result(() => { return target })).to.be(target)
            })
        })

        describe('.compose', () => {
            it('should be a function', () => {
                expect(log.utils.compose).to.be.a(Function)
            })
        })

        describe('.extend', () => {
            it('should be a function', () => {
                expect(log.utils.extend).to.be.a(Function)
            })

            it('should copy the values of all enumerable properties from one or more source objects to a target object and return it', () => {
                var target = {}
                log.utils.extend(target, {test: 'test', value: 'value'})
                expect(target).to.have.property('test', 'test')
                expect(target).to.have.property('value', 'value')

                expect(log.utils.extend({}, {test: 'test'})).to.have.property('test', 'test')

                var target = log.utils.extend({}, {a: 'a'}, {b: 'b'}, {c: 'c'})
                expect(target).to.have.property('a', 'a')
                expect(target).to.have.property('b', 'b')
                expect(target).to.have.property('c', 'c')

                var target = log.utils.extend({a: 'a'}, {a: 'b'}, {b: 'b'}, {b: 'c'})
                expect(target).to.have.property('a', 'b')
                expect(target).to.have.property('b', 'c')
            })
        })

        describe('.createStyles', () => {
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

        describe('.parseStyles', () => {
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

        describe('.divider', () => {
            it('should be a function', () => {
                expect(log.utils.divider).to.be.a(Function)
            })

            it('should create divider string', () => {
                expect(log.utils.divider()).to.be('=================================================')
            })
            it('should support optional message, symbol and length', () => {
                expect(log.utils.divider('message')).to.be('==================== message ====================')
                expect(log.utils.divider('message', '-')).to.be('-------------------- message --------------------')
                expect(log.utils.divider('message', 20)).to.be('===== message =====')
                expect(log.utils.divider('message', '-', 20)).to.be('----- message -----')
                expect(log.utils.divider('-', 20)).to.be('-------------------')
                expect(log.utils.divider(20, '-')).to.be('-------------------')
                expect(log.utils.divider('-')).to.be('-------------------------------------------------')
                expect(log.utils.divider(20)).to.be('===================')
            })
            it('should works well with multiline message', () => {
                expect(log.utils.divider('message\nmessage')).to.be('==================== message ====================\n==================== message ====================')
                expect(log.utils.divider('message\r\nmessage')).to.be('==================== message ====================\n==================== message ====================')
                expect(log.utils.divider('message\n\rmessage')).to.be('==================== message ====================\n==================== message ====================')
            })
        })

        describe('.callout', () => {
            it('should be a function', () => {
                expect(log.utils.callout).to.be.a(Function)
            })

            it('should create ASCII callout', () => {
                expect(log.utils.callout('callout')).to.be(['\t▌','\t▌ callout','\t▌'].join('\r\n'))
            })

            it('should support optional symbol', () => {
                expect(log.utils.callout('callout', '|')).to.be(['\t|','\t| callout','\t|'].join('\r\n'))
            })

            it('should works well with multiline message', () => {
                expect(log.utils.callout('callout\ncallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\r\n'))
                expect(log.utils.callout('callout\r\ncallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\r\n'))
                expect(log.utils.callout('callout\n\rcallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\r\n'))
            })
        })
    })
})