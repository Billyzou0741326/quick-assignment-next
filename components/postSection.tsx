import { Disclosure } from "@headlessui/react"

import ChevronRight from "./icons/chevron-right"
import Search from './icons/search'
import PostItem from './postItem'
import * as models from '../lib/models'


interface PostProps {
  posts?: models.Post[]
  onChangePost?: (post: models.Post) => void
  onDeletePost?: (postId: number) => void
}

const PostSection = (props: PostProps): JSX.Element => {
  const {
    posts = [],
    onChangePost = () => {},
    onDeletePost = () => {},
  } = props

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full">
            <div className={`px-6 py-2 flex flex-row items-center w-full border-l-4 border-blue-500 rounded-r-full
              shadow-md bg-white`}>
              <span className="text-2xl">Posts</span>
              <div className="flex-1"></div>
              {/*
                Use the `open` props to rotate the icon
              */}
              <ChevronRight className={`${open ? 'transform rotate-90' : ''}`} />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="p-4">
            {/* Search bar */}
            <div className="w-full mb-4 flex flex-row gap-2 items-center">
              <input
                className={`w-full text-sm px-2 py-1 font-normal bg-clip=padding border border-solid border-gray-300 rounded
                  transition ease-in-out focus:border-blue-600 focus:outline-none`}
                placeholder="Search"
              />
              <button className="p-2 rounded-md bg-green-400 hover:bg-green-600 text-white ease-in-out duration-300">
                <Search />
              </button>
            </div>
            {/* Posts */}
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostItem
                  key={`${post.id}`}
                  post={post}
                  onChange={onChangePost}
                  onDelete={onDeletePost}
                />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default PostSection
