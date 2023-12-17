import { db } from 'src/lib/db'

export const folders = () => {
  return db.folder.findMany()
}

export const folder = ({ id }) => {
  return db.folder.findUnique({
    where: { id },
  })
}

export const createFolder = ({ input }) => {
  return db.folder.create({
    data: input,
  })
}

export const updateFolder = ({ id, input }) => {
  return db.folder.update({
    data: input,
    where: { id },
  })
}

export const deleteFolder = ({ id }) => {
  return db.folder.delete({
    where: { id },
  })
}

export const Folder = {
  user: (_obj, { root }) => {
    return db.folder.findUnique({ where: { id: root?.id } }).user()
  },
  sets: (_obj, { root }) => {
    return db.folder.findUnique({ where: { id: root?.id } }).sets()
  },
}
