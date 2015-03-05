var expect = require('expect.js')
,   log = require('../src/log.js')

describe('log', function(){
    it('should be defined', function(){
        expect(log).to.be.ok()
    })

    it('should be a function', function(){
        expect(log).to.be.a(Function)
    })

    describe('#mapper', function(){
        it('should be a function', function(){
            expect(log.mapper).to.be.a(Function)
        })

        it('should be a placeholder by default', function(){
            var target = {}
            expect(log.mapper(target)).to.be(target)
        })
    })

    describe('#styles', function(){
        it('should be an object', function(){
            expect(log.styles).to.be.an(Object)
        })

        it('should be empty by default', function(){
            expect(log.styles).to.be.empty()
        })
    })

    describe('#method', function(){
        it('should be "log" by default', function(){
            expect(log.method).to.be('log')
        })
    })

    describe('#api', function(){
        it('should be `console` by default', function(){
            expect(log.api).to.be(console)
        })
    })

    describe('#toString', function(){
        it('should be a function', function(){
            expect(log.toString).to.be.a(Function)
        })

        it('should stringify `log.styles`', function(){
            expect(log.toString()).to.be('')
        })
    })

    describe('#toJSON', function(){
        it('should be a function', function(){
            expect(log.toJSON).to.be.a(Function)
        })

        it('should return `log.styles`', function(){
            expect(log.toJSON()).to.be(log.styles)
        })
    })

    describe('#on', function(){
        it('should be a function', function(){
            expect(log.on).to.be.a(Function)
        })
    })

    describe('#off', function(){
        it('should be a function', function(){
            expect(log.off).to.be.a(Function)
        })
    })

    describe('#toggle', function(){
        it('should be a function', function(){
            expect(log.toggle).to.be.a(Function)
        })
    })

    describe('#defaults', function(){
        it('should be an object', function(){
            expect(log.defaults).to.be.an(Object)
        })
    })

    describe('#mixin', function(){

    })

    describe('#utils', function(){

        it('should be an object', function(){
            expect(log.utils).to.be.an(Object)
        })

        describe('.id', function(){
            it('should be a function', function(){
                expect(log.utils.id).to.be.a(Function)
            })

            it('should be a placeholder', function(){
                var target = {}
                expect(log.utils.id(target)).to.be(target)
            })
        })

        describe('.result', function(){
            it('should be a function', function(){
                expect(log.utils.id).to.be.a(Function)
            })

            it('should return result of function call if passed function otherwise return passing value', function(){
                var target = {}
                expect(log.utils.result(target)).to.be(target)
                expect(log.utils.result(function(){ return target })).to.be(target)
            })
        })

        describe('.compose', function(){
            it('should be a function', function(){
                expect(log.utils.compose).to.be.a(Function)
            })
        })

        describe('.extend', function(){
            it('should be a function', function(){
                expect(log.utils.extend).to.be.a(Function)
            })

            it('should copy the values of all enumerable properties from one or more source objects to a target object and return it', function(){
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

        describe('.createStyles', function(){
            it('should be a function', function(){
                expect(log.utils.createStyles).to.be.a(Function)
            })

            it('should convert object to valid css style string', function(){
                expect(log.utils.createStyles({})).to.be('')
                expect(log.utils.createStyles({color: 'red'})).to.be('color:red;')
                expect(log.utils.createStyles({color: 'red', padding: '20px'})).to.be('color:red;padding:20px;')
            })
        })

        describe('.parseStyles', function(){
            it('should be a function', function(){
                expect(log.utils.parseStyles).to.be.a(Function)
            })

            it('should convert css style string to object', function(){
                expect(log.utils.parseStyles('')).to.eql({})
                expect(log.utils.parseStyles(';')).to.eql({})
                expect(log.utils.parseStyles('color:red')).to.have.property('color','red')
                expect(log.utils.parseStyles('color:red;padding:20px;')).to.only.have.keys('color', 'padding')
                expect(log.utils.parseStyles('color: red; padding: 20px; \tfont-size: 100%')).to.only.have.keys('color', 'padding', 'font-size')
            })
        })

        describe('.divider', function(){
            it('should be a function', function(){
                expect(log.utils.divider).to.be.a(Function)
            })

            it('should create divider string', function(){
                expect(log.utils.divider()).to.be('=================================================')
            })
            it('should support optional message, symbol and length', function(){
                expect(log.utils.divider('message')).to.be('==================== message ====================')
                expect(log.utils.divider('message', '-')).to.be('-------------------- message --------------------')
                expect(log.utils.divider('message', 20)).to.be('===== message =====')
                expect(log.utils.divider('message', '-', 20)).to.be('----- message -----')
                expect(log.utils.divider('-', 20)).to.be('-------------------')
                expect(log.utils.divider(20, '-')).to.be('-------------------')
                expect(log.utils.divider('-')).to.be('-------------------------------------------------')
                expect(log.utils.divider(20)).to.be('===================')
            })
            it('should works well with multiline message', function(){
                expect(log.utils.divider('message\nmessage')).to.be('==================== message ====================\n==================== message ====================')
                expect(log.utils.divider('message\r\nmessage')).to.be('==================== message ====================\n==================== message ====================')
                expect(log.utils.divider('message\n\rmessage')).to.be('==================== message ====================\n==================== message ====================')
            })
        })

        describe('.callout', function(){
            it('should be a function', function(){
                expect(log.utils.callout).to.be.a(Function)
            })

            it('should create ASCII callout', function(){
                expect(log.utils.callout('callout')).to.be(['\t▌','\t▌ callout','\t▌'].join('\r\n'))
            })

            it('should support optional symbol', function(){
                expect(log.utils.callout('callout', '|')).to.be(['\t|','\t| callout','\t|'].join('\r\n'))
            })

            it('should works well with multiline message', function(){
                expect(log.utils.callout('callout\ncallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\r\n'))
                expect(log.utils.callout('callout\r\ncallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\r\n'))
                expect(log.utils.callout('callout\n\rcallout')).to.be(['\t▌','\t▌ callout','\t▌ callout','\t▌'].join('\r\n'))
            })
        })
    })
})