Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    {cacheSession = true}={},
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user, {delay: 0})
      cy.get("[data-qa-selector='password_field']").type(password, { log: false, delay: 0 })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate =()=>{
      cy.visit('/')
      cy.location('pathname',{timeout: 1000})
        .should('not.eq', '/users/sign_in')
    }

    const options = {
      cacheAcrossSpecs: true,
      validate,
    }
    if(cacheSession){
      cy.session(user, login, options)
    }else{
      login()
    }
})

Cypress.Commands.add('logout',()=>{
    cy.get('[data-qa-selector="user_menu"]').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()
    cy.title('eq','Sign in · GitLab')
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name,{delay: 0})
  cy.get('#project_description').type(project.description,{delay: 0})
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue =>{
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestonOnIssue', miles =>{
  cy.get('.block.milestone .edit-link').click()
  cy.contains(miles.title).click()
})

Cypress.Commands.add('gui_createSnippets', snippets =>{
  cy.visit('/snippets/new')

  cy.get('.qa-snippet-title').type(snippets.title)
  cy.get('#personal_snippet_description').type(snippets.description)
  cy.get('.ace_content').type(snippets.file)

  cy.get('.qa-create-snippet-button').click()
})

Cypress.Commands.add('gui_createGroup', group=>{
  cy.visit('/groups/new')

  cy.get('#group_name').type(group.name)
  cy.get('#group_path').clear().type(group.gUrl)
  cy.get('#group_visibility_level_10').check()

  cy.contains('Create group').click()
})