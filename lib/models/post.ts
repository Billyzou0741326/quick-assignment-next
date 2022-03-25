import * as yup from 'yup'


export const postSchema = yup.object({
  userId: yup.number().defined().default(-1),
  id: yup.number().defined().default(-1),
  title: yup.string().default(''),
  body: yup.string().default(''),
})

export interface Post extends yup.InferType<typeof postSchema> {}
