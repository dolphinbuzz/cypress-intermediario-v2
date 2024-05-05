import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Deleta snippets', options, ()=>{
    beforeEach(() => cy.api_deleteSnippets() )

    it('sucesso', () => {
        const snippets ={
            title: `snippets-${faker.random.words(3)}`,
            description: faker.random.words(10),
            visibility: 'internal',
            file_name: `nome.txt`,
            content: `${faker.random.words(20)}`,
            files:[
                {
                    content: `${faker.random.words(20)}`,
                    file_path: 'test.rb'
                }
            ] 
        } 

        cy.api_createSnippets(snippets)
            .then(response =>{
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(snippets.title)
                expect(response.body.description).to.equal(snippets.description)
            })

    });
})