import React from 'react'
import type { GetServerSideProps, NextPage } from "next"

import * as models from '../../lib/models'
import * as api from '../../lib/api'
import UserCard from "../../components/userCard"
import PostSection from '../../components/postSection'
import PostContext from '../../lib/context/post'
import AlbumSection from '../../components/albumSection'
import AlbumContext from '../../lib/context/album'


interface UserDetailProps {
  user: models.User
  albums?: models.Album[]
  posts?: models.Post[]
}

const UserDetail: NextPage<UserDetailProps, {}> = (props) => {
  const {
    user,
    albums = [],
    posts = [],
  } = props
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
    <div className="w-screen min-h-screen flex flex-col gap-8 md:flex-row p-8 bg-gray-200/50">
      {/* User profile */}
      <div className="justify-center p-4">
        <UserCard user={user} />
      </div>
      <div className="flex flex-col gap-4 p-4 w-full">
        {/* Posts */}
        <PostContext.Provider value={{ getCommentsByPostId: api.getCommentsByPostId }}>
          <PostSection
            posts={postsState}
            onDeletePost={(postId) => onDeletePost(postId)}
            onChangePost={(post) => onChangePost(post)}
          />
        </PostContext.Provider>
        {/* Albums */}
        <AlbumContext.Provider value={{ getPhotosByAlbumId: api.getPhotosByAlbumId }}>
          <AlbumSection
            albums={albums}
          />
        </AlbumContext.Provider>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = 1
  const [ user, posts, albums ] = await Promise.all([
    api.getUserById(uid),
    api.getPostsByUserId(uid),
    api.getAlbumsByUserId(uid),
  ])
  if (!user.id) {
    return {
      notFound: true,
      props: {},
    }
  }
  return {
    props: {
      user,
      albums,
      posts,
    },
  }
}

export default UserDetail
