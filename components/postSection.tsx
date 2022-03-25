import { Disclosure } from "@headlessui/react"

import ChevronRight from "./icons/chevron-right"
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
            <div className="px-6 py-2 flex flex-row items-center w-full border-l-4 border-green-500 rounded-r-full bg-white">
              <span className="text-2xl">Posts</span>
              <div className="flex-1"></div>
              {/*
                Use the `open` props to rotate the icon
              */}
              <ChevronRight className={`${open ? 'transform rotate-90' : ''}`} />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="p-4">
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
