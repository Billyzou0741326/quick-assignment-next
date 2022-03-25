import * as yup from 'yup'


export const albumSchema = yup.object({
  userId: yup.number().defined().default(-1),
  id: yup.number().defined().default(-1),
  title: yup.string().default(''),
})

export interface Album extends yup.InferType<typeof albumSchema> {}
