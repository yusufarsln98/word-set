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

export const addSetToFolder = ({ id, input }) => {
  return db.folder.update({
    data: {
      sets: {
        connect: {
          id: input.setId,
        },
      },
    },
    where: { id },
  })
}

export const removeSetFromFolder = ({ id, input }) => {
  return db.folder.update({
    data: {
      sets: {
        disconnect: {
          id: input.setId,
        },
      },
    },
    where: { id },
  })
}

export const deleteFolder = async ({ id }) => {
  // function below disconnects set and remove the folder
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
