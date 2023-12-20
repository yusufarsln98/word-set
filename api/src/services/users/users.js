import { db } from 'src/lib/db'

export const users = async () => {
  // add some delay
  return db.user.findMany()
}

export const user = async ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  userConfig: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).userConfig()
  },
  folders: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).folders()
  },
  sets: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).sets()
  },
}
