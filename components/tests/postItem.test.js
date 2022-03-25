import { mount } from '@cypress/react'
import PostItem from '../postItem'
import PostContext from '../../lib/context/post'

describe('Post Item component test', () => {
  const post = {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
  const comments = [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
  ]
  const getCommentsByPostId = async () => {
    return comments
  }

  it('renders section title', () => {
    mount(
      <PostContext.Provider value={{ getCommentsByPostId: getCommentsByPostId }}>
        <PostItem post={post} />
      </PostContext.Provider>
    )
    cy.contains(post.title).should('exist').and('be.visible')
  })
})
