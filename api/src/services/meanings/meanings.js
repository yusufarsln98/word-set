import { db } from 'src/lib/db'

export const meanings = () => {
  return db.meaning.findMany()
}

export const meaning = ({ id }) => {
  return db.meaning.findUnique({
    where: { id },
  })
}

export const createMeaning = ({ input }) => {
  return db.meaning.create({
    data: input,
  })
}

export const updateMeaning = ({ id, input }) => {
  return db.meaning.update({
    data: input,
    where: { id },
  })
}

export const deleteMeaning = ({ id }) => {
  return db.meaning.delete({
    where: { id },
  })
}

export const Meaning = {
  word: (_obj, { root }) => {
    return db.meaning.findUnique({ where: { id: root?.id } }).word()
  },
}
