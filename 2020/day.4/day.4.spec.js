const { expect } = require('chai')
const { raw } = require('../puzzle.input')
const {
    parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator
} = require('../parsing')

const fields = [
    { name:'byr', parse:(value)=> parseInt(value) }, 
    { name:'iyr', parse:(value)=> parseInt(value) },
    { name:'eyr', parse:(value)=> parseInt(value) },
    { name:'hgt', parse:(value)=> {
        let pattern = /(\d*)(in|cm)/
        return pattern.test(value) ?
            { unit:pattern.exec(value)[2], value:parseInt(pattern.exec(value)[1]) }
            : value
    } },
    { name:'hcl', parse:(value)=> value },
    { name:'ecl', parse:(value)=> value },
    { name:'pid', parse:(value)=> value }
]
const parsePassport = (definition)=>{
    let passport = {}
    fields.forEach((field)=>{
        if (definition.indexOf(field.name)!=-1) {
            let start = definition.indexOf(field.name)
            let subpart = definition.substring(start)
            let end = subpart.indexOf(' ')
            let value = subpart.substring(0, end).split(':')[1]
            passport[field.name] = field.parse(value)
        }
    })
    return passport
}
const hasAllFields = (passport)=>{
    for (var i=0; i<fields.length; i++){
        let field = fields[i]
        if (passport[field.name] === undefined) {
            return false
        }
    }
    return true
}
describe('day 4 challenge', ()=> {

    describe('example', ()=>{

        let input
        beforeEach(()=>{
            input = raw('day.4', 'example.txt')
        })
        it('has 14 definition', ()=>{
            expect(input.length).to.equal(14)
        })
        it('defines 4 passports', ()=>{
            expect(parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(input, parsePassport).length).to.equal(4)
        })
        it('defines correctly the last passport', ()=>{
            let passports = parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(input, parsePassport)
            let passport = passports[3]

            expect(passport).to.deep.equal({
                ecl:'brn',
                eyr:2025,
                hcl:'#cfa07d',
                hgt:{ unit:'in', value:59 },
                iyr:2011,
                pid:'166559648'
            })
        })
        it('can identify invalid passports', ()=>{
            let passports = parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(input, parsePassport)
            let passport = passports[3]

            expect(hasAllFields(passport)).to.equal(false)
        })
        it('has 2 valid passports', ()=>{
            expect(parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(input, parsePassport)
                .filter(p => hasAllFields(p)).length).to.equal(2)
        })
        it('leads to part 1 solution', ()=>{
            expect(parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(raw('day.4', 'input.txt'), parsePassport).filter(p => hasAllFields(p)).length).to.equal(239)
        })
    })
    describe('part 2', ()=>{

        describe('additional validation rules', ()=>{

            let byr = (value)=>{
                return value >=1920 && value<=2002
            }
            let iyr = (value)=>{
                return value >=2010 && value<=2020
            }
            let eyr = (value)=>{
                return value >=2020 && value<=2030
            }
            let hgt = (input)=>{
                if (input.unit == 'in' && input.value >= 59 && input.value<=76) {
                    return true
                }
                if (input.unit == 'cm' && input.value >= 150 && input.value<=193) {
                    return true
                }
                return false
            }
            let hcl = (value)=>{
                return value.length == 7 && /^#[0-9|a-f]*$/.test(value)
            }
            let ecl = (value)=>{
                return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
            }
            let pid = (value)=>{
                return /^[0-9]{9}$/.test(value)
            }
            describe('for byr', ()=>{

                it('can detect some valid values', ()=>{
                    expect(byr(1920)).to.equal(true)
                    expect(byr(2002)).to.equal(true)
                    expect(byr(1980)).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(byr(1919)).to.equal(false)
                    expect(byr(2003)).to.equal(false)
                })
            })
            describe('for iyr', ()=>{

                it('can detect some valid values', ()=>{
                    expect(iyr(2010)).to.equal(true)
                    expect(iyr(2020)).to.equal(true)
                    expect(iyr(2015)).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(iyr(2009)).to.equal(false)
                    expect(iyr(2021)).to.equal(false)
                })

            })
            describe('for eyr', ()=>{

                it('can detect some valid values', ()=>{
                    expect(eyr(2020)).to.equal(true)
                    expect(eyr(2030)).to.equal(true)
                    expect(eyr(2025)).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(eyr(2019)).to.equal(false)
                    expect(eyr(2031)).to.equal(false)
                })
            })
            describe('for hgt', ()=>{

                it('can detect some valid values', ()=>{
                    expect(hgt({ unit:'in', value:60 })).to.equal(true)
                    expect(hgt({ unit:'cm', value:190 })).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(hgt({ unit:'in', value:190 })).to.equal(false)
                    expect(hgt('190')).to.equal(false)
                })
            })
            describe('for hcl', ()=>{

                it('can detect some valid values', ()=>{
                    expect(hcl('#123abc')).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(hcl('#123abz')).to.equal(false)
                    expect(hcl('123abc')).to.equal(false)
                })
            })
            describe('for ecl', ()=>{

                it('can detect some valid values', ()=>{
                    expect(ecl('brn')).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(ecl('wat')).to.equal(false)
                })
            })
            describe('for pid', ()=>{

                it('can detect some valid values', ()=>{
                    expect(pid('000000001')).to.equal(true)
                })
                it('can detect some invalid values', ()=>{
                    expect(pid('0123456789')).to.equal(false)
                })
            })

            let rules = [
                { target:'byr', passes:byr },
                { target:'iyr', passes:iyr },
                { target:'eyr', passes:eyr },
                { target:'hgt', passes:hgt },
                { target:'hcl', passes:hcl },
                { target:'ecl', passes:ecl },
                { target:'pid', passes:pid }
            ]
            let isValid = (passport, rules)=>{
                if (! hasAllFields(passport)) { return false }

                for (var i=0; i<rules.length; i++) {
                    let rule = rules[i]
                    if (!rule.passes(passport[rule.target])) {
                        return false
                    }
                }
                return true
            }
            it('identify passports as invalid as expected', ()=>{
                let passports = parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(raw('day.4', 'invalid.txt'), parsePassport)
                let count = passports.filter((passport)=>isValid(passport, rules)).length

                expect(count).to.equal(0)
            })
            it('identify passports as valid as expected', ()=>{
                let passports = parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(raw('day.4', 'valid.txt'), parsePassport)
                let count = passports.filter((passport)=>isValid(passport, rules)).length

                expect(count).to.equal(4)
            })
            it('makes less passports valid', ()=>{
                let passports = parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator(raw('day.4', 'input.txt'), parsePassport)
                let count = passports.filter((passport)=>isValid(passport, rules)).length

                expect(count).to.equal(188)
            })
        })
    })
})

