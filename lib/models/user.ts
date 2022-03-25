import * as yup from 'yup'


export const userSchema = yup.object({
  id: yup.number().defined().default(-1),
  name: yup.string().default(''),
  username: yup.string().default(''),
  email: yup.string().default(''),
  address: yup.object({}).nullable(),
  phone: yup.string().default(''),
  website: yup.string().url().default(''),
  company: yup.object({}).nullable(),
})

export interface User extends yup.InferType<typeof userSchema> {}
