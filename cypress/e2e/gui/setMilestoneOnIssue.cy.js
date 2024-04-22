import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set Milestone On Issue', options, ()=>{
    const issue ={
        title:`issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project:{
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    const miles ={
        title: `milestone-${faker.random.words(2)}`
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response =>{
                cy.api_createMilestone(response.body.project_id, miles)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })


    it('successfully', () => {
        cy.gui_setMilestonOnIssue(miles)

        cy.get('.block.milestone')
            .should('contain', miles.title)
    });
})