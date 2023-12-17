import { db } from 'src/lib/db'

export const userConfigs = () => {
  return db.userConfig.findMany()
}

export const userConfig = ({ id }) => {
  return db.userConfig.findUnique({
    where: { id },
  })
}

export const createUserConfig = ({ input }) => {
  return db.userConfig.create({
    data: input,
  })
}

export const updateUserConfig = ({ id, input }) => {
  return db.userConfig.update({
    data: input,
    where: { id },
  })
}

export const deleteUserConfig = ({ id }) => {
  return db.userConfig.delete({
    where: { id },
  })
}

export const UserConfig = {
  avatar: (_obj, { root }) => {
    return db.userConfig.findUnique({ where: { id: root?.id } }).avatar()
  },
  user: (_obj, { root }) => {
    return db.userConfig.findUnique({ where: { id: root?.id } }).user()
  },
}
