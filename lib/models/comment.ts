import * as yup from 'yup'


export const commentSchema = yup.object({
  id: yup.number().required().default(-1),
  postId: yup.number().required().default(-1),
  name: yup.string().default(''),
  email: yup.string().default(''),
  body: yup.string().default(''),
})

export interface Comment extends yup.InferType<typeof commentSchema> {}
