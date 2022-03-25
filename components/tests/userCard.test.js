import { mount } from '@cypress/react'
import UserCard from '../userCard'

describe('UserCard', () => {
  it('renders the user info', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      username: 'john.doe',
      email: 'john.doe@example.com',
      address: null,
      phone: '(555) 555-5555',
      website: 'https://john-doe.example.com',
      company: null,
    }
    mount(<UserCard user={user} />)
    cy.contains(user.name).should('exist')
    cy.contains(user.username).should('exist')
    cy.contains(user.email).should('exist')
    cy.get('a').should('have.attr', 'href')
  })
})
