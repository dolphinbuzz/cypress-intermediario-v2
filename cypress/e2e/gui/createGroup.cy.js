import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }


describe('Create Group',options,()=>{
    beforeEach(()=>{
        cy.login();
    })


    it('sucesso', () => {

        const group ={
            name: `group-${faker.datatype.uuid()}`,
            gUrl: faker.random.word(),
            visibility:'internal'
        }

        cy.gui_createGroup(group)

        cy.url().should('eq', `${Cypress.config('baseUrl')}/${group.gUrl}`)
        cy.get('.group-home-panel').contains(`${group.name}`)
    });

})