import { mount } from '@cypress/react'
import AlbumItem from '../albumItem'
import AlbumContext from '../../lib/context/album'

describe('Album Item component test', () => {
  const album = {
    id: 91,
    userId: 10,
    title: 'repellendus praesentium debitis officiis',
  }
  const photos = [
    {
      albumId: 91,
      id: 4501,
      title: "adipisci consequuntur facilis doloremque dolor eveniet eius eos quo",
      url: "https://via.placeholder.com/600/71f4a0",
      thumbnailUrl: "https://via.placeholder.com/150/71f4a0"
    },
    {
      albumId: 91,
      id: 4502,
      title: "quo est ipsa placeat earum porro quo",
      url: "https://via.placeholder.com/600/b586c9",
      thumbnailUrl: "https://via.placeholder.com/150/b586c9"
    },
  ]
  const getPhotosByAlbumId = async () => {
    return photos
  }

  it('renders section title', () => {
    mount(
      <AlbumContext.Provider value={{ getPhotosByAlbumId: getPhotosByAlbumId }}>
        <AlbumItem album={album} />
      </AlbumContext.Provider>
    )
    cy.contains(album.title).should('exist')
  })
  it('expands section on click', () => {
    mount(
      <AlbumContext.Provider value={{ getPhotosByAlbumId: getPhotosByAlbumId }}>
        <AlbumItem album={album} />
      </AlbumContext.Provider>
    )
    cy.get('button').contains(album.title).click('exist')
    cy.get(`[alt="${album.title}"]`).should('be.visible')
  })
})
