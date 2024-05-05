import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Snippets',options,()=>{
    beforeEach(() => {
        cy.api_deleteSnippets()
        cy.login()
      })

    it('sucesso', () => {
        const snippets ={
            title: `snippets-${faker.random.words(3)}`,
            description: faker.random.words(10),
            file:  faker.random.words(20)
        } 

        cy.gui_createSnippets(snippets)

        cy.contains(snippets.title).should('be.visible')
        cy.contains(snippets.description).should('be.visible')
        cy.contains(snippets.file).should('be.visible')

    });

})