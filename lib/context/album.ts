import { createContext } from 'react'

import * as api from '../api'


const AlbumContext = createContext({
  getPhotosByAlbumId: api.getPhotosByAlbumId,
})

export default AlbumContext
