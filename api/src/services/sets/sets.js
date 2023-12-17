import { db } from 'src/lib/db'

export const sets = () => {
  return db.set.findMany()
}

export const set = ({ id }) => {
  return db.set.findUnique({
    where: { id },
  })
}

export const createSet = ({ input }) => {
  return db.set.create({
    data: input,
  })
}

export const updateSet = ({ id, input }) => {
  return db.set.update({
    data: input,
    where: { id },
  })
}

export const deleteSet = ({ id }) => {
  return db.set.delete({
    where: { id },
  })
}

export const Set = {
  folder: (_obj, { root }) => {
    return db.set.findUnique({ where: { id: root?.id } }).folder()
  },
  flashCards: (_obj, { root }) => {
    return db.set.findUnique({ where: { id: root?.id } }).flashCards()
  },
}
