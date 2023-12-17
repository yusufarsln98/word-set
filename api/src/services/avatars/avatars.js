import { db } from 'src/lib/db'

export const avatars = () => {
  return db.avatar.findMany()
}

export const avatar = ({ id }) => {
  return db.avatar.findUnique({
    where: { id },
  })
}

export const createAvatar = ({ input }) => {
  return db.avatar.create({
    data: input,
  })
}

export const updateAvatar = ({ id, input }) => {
  return db.avatar.update({
    data: input,
    where: { id },
  })
}

export const deleteAvatar = ({ id }) => {
  return db.avatar.delete({
    where: { id },
  })
}

export const Avatar = {
  userConfig: (_obj, { root }) => {
    return db.avatar.findUnique({ where: { id: root?.id } }).userConfig()
  },
}
