import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }


describe('Create Group API',options,()=>{
    beforeEach(()=>{
        cy.api_deleteGroup();
    })

    it('sucesso', () => {
        const group = {
            name: `group-${faker.datatype.uuid()}`,
            gUrl: faker.random.word(),
            visibility:'internal'
        }

        cy.api_createGroup(group)
            .then(response=>{
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(group.name)
                expect(response.body.path).to.equal(group.gUrl)
                expect(response.body.visibility).to.equal(group.visibility)
            })
        
    });

})

