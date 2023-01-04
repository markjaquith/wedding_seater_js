import Table from './Table'
import Person from './Person'
import Wedding from './Wedding'
import { tests } from './tests.js'
describe('Wedding', () => {
    it('should return true if unassigned people array is empty after wild assignment', () => {
        const wedding = new Wedding([new Person('John', 'Doe')],[new Table(1)])
        wedding.wildAssign()
        expect(wedding.people).toStrictEqual([])
    })
    it('should return true if person is removed', () => {
        const wedding = new Wedding([new Person('John', 'Doe'), new Person('Jane', 'Doe')], [])
        wedding.removePersonById(0)
        expect(wedding.people).toStrictEqual([new Person('Jane', 'Doe')])
    })
    it('should return true if table is maxed out after wild assignment', () => {
        const wedding = new Wedding([new Person('John', 'Doe'), new Person('Jane', 'Doe')], [new Table(1), new Table(1)])
        wedding.wildAssign()
        expect(wedding.tables[0].isFull()).toBe(true)
    })
    it('should return true if person is not added when table is full', () => {
        const wedding = new Wedding([new Person('John', 'Doe'), new Person('Jane', 'Doe')], [new Table(1)])
        wedding.wildAssign()
        expect(wedding.people.length).toBe(1)
    })
    it('should return true if assigned people getter returns people properly', () => {
        const wedding = new Wedding([],[new Table(2, [new Person('John', 'Doe'), new Person('Jane', 'Doe')]), new Table(2, [new Person('John', 'Doe'), new Person('Jane', 'Doe')])])
        expect(wedding.getAssignedPeople()).toStrictEqual([new Person('John', 'Doe'), new Person('Jane', 'Doe'), new Person('John', 'Doe'), new Person('Jane', 'Doe')])
    })
    it('should return true if getAssignedPeople method returns all people assigned', () => {
        const wedding = new Wedding([],[new Table(1, [new Person('John', 'Doe')]), new Table(1, [new Person('Jane', 'Doe')])])
        expect(wedding.getAssignedPeople()).toStrictEqual([new Person('John', 'Doe'), new Person('Jane', 'Doe')])
    })
    it('should return true if the people before wild assignment are all accounted for in tables after wild assignment', () => {
        const wedding = new Wedding([new Person('John', 'Doe'), new Person('Jane', 'Doe')], [new Table(2)])
        let unassigned = [...wedding.people]
        wedding.wildAssign()
        let assigned = wedding.getAssignedPeople()
        expect(unassigned).toStrictEqual(assigned)
    })
    it('should return true if person is assigned to table', () => {
        const man = new Person('John', 'Doe')
        const woman = new Person('Jane', 'Doe')		
        const table = new Table(1)
        const table2 = new Table(2)
        const wedding = new Wedding([man, woman],[table])
        wedding.assignPerson(man, table2)
        expect(table2.people).toStrictEqual([man])
    })
    it('should return true if couple is assigned to same table', () => {
        const man = new Person('John', 'Doe')
        const woman = new Person('Jane', 'Doe')
        man.coupleWith(woman)	
        const table = new Table(2)
        const table2 = new Table(2)
        const wedding = new Wedding([man, woman],[table])
        wedding.assignCouple(wedding.people[0], table)
        console.log(wedding.people[0])
        expect(table.people).toStrictEqual([new Person('John', 'Doe'), new Person('Jane', 'Doe')])
    })
    // it('should return true if couple is not assigned to separate tables', () => {
    //     const man = new Person('John', 'Doe')
    //     const rando = new Person('Rando', 'Williams')
    //     const woman = new Person('Jane', 'Doe')
    //     man.coupleWith(woman)
    //     const table = new Table(2)
    //     const table2 = new Table(2)
    //     const wedding = new Wedding([man, rando, woman],[table, table2])
    //     console.log(wedding.people)
    //     wedding.wildAssign()
    //     expect(table2.people).toStrictEqual([])
    // })
    // it('should return true if couple is assigned to same table', () => {
    //     const man = new Person('John', 'Doe')
    //     const woman = new Person('Jane', 'Doe')
    //     man.coupleWith(woman)	
    //     const table = new Table(1)
    //     const table2 = new Table(2)
    //     const wedding = new Wedding([man, woman],[table])
    //     wedding.wildAssign()
    //     expect(table.people).toStrictEqual([])
    // })
})