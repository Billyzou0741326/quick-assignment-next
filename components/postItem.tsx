import React from 'react'

import * as models from '../lib/models'
import PencilAlt from './icons/pencil-alt'
import Trash from './icons/trash'

interface PostItemProps {
  post?: models.Post
  onDelete?: (postId: number) => void
  onChange?: (post: models.Post) => void
}


const PostItem = (props: PostItemProps): JSX.Element => {
  const {
    post = null,
    onChange = () => {},
    onDelete = () => {},
  } = props
  const [ editing, setEditing ] = React.useState(false)
  const [ editedTitle, setEditedTitle ] = React.useState(post ? post.title : '')
  const [ editedBody, setEditedBody ] = React.useState(post ? post.body : '')

  const updatePost = async (newTitle: string, newBody: string, post: models.Post) => {
    const updatedPost = Object.assign({}, post, {
      title: newTitle,
      body:  newBody,
    })
    await Promise.resolve(onChange(updatedPost))
    console.log('Done!')
    setEditing(false)
  }

  return (
    <>
      {post && (
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
          {/* Title */}
          <div className="flex flex-row gap-2">
            <span>{post.title}</span>

            <div className="grow"></div>

            {editing ? (
              <>
                <button
                  className="py-0 px-2 rounded-md bg-green-500 hover:bg-green-700 ease-in-out duration-300 text-white"
                  onClick={() => updatePost(editedTitle, editedBody, post)}
                >
                  <span className="text-sm">Update</span>
                </button>
                <button
                  className="py-0 px-2 rounded-md bg-gray-100 hover:bg-gray-300 ease-in-out duration-300"
                  onClick={() => setEditing(false)}
                >
                  <span className="text-sm">Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)}>
                  <PencilAlt className="h-4 w-4 text-green-500 hover:text-green-600 ease-in-out duration-300" />
                </button>
                <button onClick={() => onDelete(post.id)}>
                  <Trash className="h-4 w-4 text-red-400 hover:text-red-600 ease-in-out duration-300" />
                </button>
              </>
            )}
          </div>

          <div className="border-b my-2"></div>

          {/* Body */}
          <div className="flex flex-row gap-2">
            {editing ? (
              <textarea
                className={`w-full p-2 text-base font-normal bg-clip=padding border border-solid border-gray-300 rounded
                  transition ease-in-out focus:border-blue-600 focus:outline-none`}
                rows={5}
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            ) : (
              <span>{post.body}</span>
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default PostItem
