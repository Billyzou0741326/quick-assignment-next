import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'

import * as models from '../../lib/models'
import * as api from '../../lib/api'
import PostSection from '../../components/postSection'
import PostContext from '../../lib/context/post'


interface PostProps {
  posts?: models.Post[]
}

const Post: NextPage<PostProps, {}> = (props) => {
  const { posts = [] } = props
  const [ postsState, setPostsState ] = React.useState<models.Post[]>(posts)

  const onDeletePost = async (postId: number) => {
    await api.deletePostById(postId)
    setPostsState(postsState.filter((post) => (post.id !== postId)))
  }
  const onChangePost = async (post: models.Post) => {
    console.log('on change post')
    console.log(post)
    const updatedPost = await api.updatePost(post)
    console.log(updatedPost)
    setPostsState(postsState.map((p) => (p.id === post.id ? updatedPost : p)))
  }

  return (
    <div className="min-h-screen max-w-screen bg-gray-200">
      <PostContext.Provider value={{ getCommentsByPostId: api.getCommentsByPostId }}>
        <PostSection
          posts={postsState}
          onDeletePost={(postId) => onDeletePost(postId)}
          onChangePost={(post) => onChangePost(post)}
        />
      </PostContext.Provider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const posts = await api.getPostsByUserId(1)
  return {
    props: {
      posts
    },
  }
}

export default Post
