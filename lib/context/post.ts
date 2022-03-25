import { createContext } from 'react'

import * as api from '../api'


const PostContext = createContext({
  getCommentsByPostId: api.getCommentsByPostId,
})

export default PostContext
