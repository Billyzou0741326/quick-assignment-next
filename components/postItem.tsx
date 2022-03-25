import React from 'react'

import * as models from '../lib/models'
import PostContext from '../lib/context/post'
import PencilAlt from './icons/pencil-alt'
import Trash from './icons/trash'
import ChevronRight from './icons/chevron-right'

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
  const [ loading, setLoading ] = React.useState(false)
  const [ editing, setEditing ] = React.useState(false)
  const [ expanded, setExpanded ] = React.useState(false)
  const [ editedTitle, setEditedTitle ] = React.useState(post ? post.title : '')
  const [ editedBody, setEditedBody ] = React.useState(post ? post.body : '')
  const [ comments, setComments ] = React.useState<models.Comment[]>([])
  const { getCommentsByPostId } = React.useContext(PostContext)

  const updatePost = async (newTitle: string, newBody: string, post: models.Post) => {
    const updatedPost = Object.assign({}, post, {
      title: newTitle,
      body:  newBody,
    })
    await Promise.resolve(onChange(updatedPost))
    setEditing(false)
  }

  const lazyLoadComments = async () => {
    if (post !== null && (!comments || comments.length === 0)) {
      setLoading(true)
      const comments = await getCommentsByPostId(post.id)
      setLoading(false)
      setComments(comments)
    }
  }

  const onExpandedClick = (exp: boolean) => {
    exp && lazyLoadComments()
    setExpanded(exp)
  }

  return (
    <>
      {post && (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
          {/* Title */}
          <div className="flex flex-row gap-2">
            <span className="font-semibold text-lg">{post.title}</span>

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

          <div className="border-b my-2"></div>

          <div className="flex flex-row gap-2">
            <input
              className={`w-full text-sm px-2 py-1 font-normal bg-clip=padding border border-solid border-gray-300 rounded
                transition ease-in-out focus:border-blue-600 focus:outline-none`}
              placeholder="Comment"
            />
            <button className="px-2 py-1 text-white rounded-md bg-blue-500 hover:bg-blue-700 ease-in-out duration-300">
              <span className="text-sm">Send</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="flex flex-col gap-2">
            <button
              className="w-full bg-gray-100 flex flex-row items-center justify-center py-1"
              onClick={() => onExpandedClick(!expanded)}
            >
              <span>{expanded ? 'Hide comments' : 'Load comments'}</span>
              <ChevronRight className={`${expanded ? 'transform rotate-90' : ''}`} />
            </button>
            {/* Comments */}
            <div className={`flex flex-col gap-4 p-2 divide-y border rounded-md ${expanded && !loading ? '' : 'hidden'}`}>
              {comments.map((comment) => (
                <div key={`${comment.id}`} className="flex flex-col gap-2 pt-2">
                  <span className="font-semibold">{comment.name}</span>
                  <span>{comment.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostItem
