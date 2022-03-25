import type { GetServerSideProps, NextPage } from "next"

import * as models from '../../lib/models'
import * as api from '../../lib/api'


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

  console.log(albums)

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 md:flex-row p-8 bg-gray-200/50">
      {/* User profile */}
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        {/* Avatar */}
        <div className="rounded-full w-32 md:w-full aspect-w-16 aspect-h-16 md:max-w-48 bg-white shadow-md">
        </div>
        {/* Info */}
        <div className="flex flex-col gap-2 w-full whitespace-nowrap">
          <span className="font-medium text-2xl tracking-wide">{user.username}</span>
          <span className="font-thin text-xl tracking-wide">{user.name}</span>
          <span className="text-md">{user.email}</span>
        </div>
        {/* Website */}
        <div>
          <a
            href={user.website}
            target="_blank noopener noreferrer"
          >
            {user.website}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {/* Posts */}
        <div className="flex flex-col w-full h-1/2">
          <div className="flex flex-row">
            <div className="px-6 py-2 border-l-4 border-blue-500 rounded-r-full bg-white">
              <span className="text-2xl">Posts</span>
            </div>
          </div>
          {posts.map((post) => (
            <div key={`${post.id}`}>
              <span>{post.title}</span>
            </div>
          ))}
        </div>
        {/* Albums */}
        <div className="flex flex-col w-full h-1/2">
          <div className="flex flex-row">
            <div className="px-6 py-2 border-l-4 border-green-500 rounded-r-full bg-white">
              <span className="text-2xl">Albums</span>
            </div>
          </div>
          <div className="flex flex-col">
            {albums.map((album) => (
              <div key={`${album.id}`}>
                <span>{album.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { userId } = context.query
  if (!userId || Array.isArray(userId)) {
    userId = ''
  }
  const uid = Number.parseInt(userId) || 0
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
