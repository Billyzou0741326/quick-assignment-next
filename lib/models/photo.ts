import * as yup from 'yup'


export const photoSchema = yup.object({
  albumId: yup.number().defined().default(-1),
  id: yup.number().defined().default(-1),
  title: yup.string().default(''),
  url: yup.string().url().default(''),
  thumbnailUrl: yup.string().url().default(''),
})

export interface Photo extends yup.InferType<typeof photoSchema> {}
