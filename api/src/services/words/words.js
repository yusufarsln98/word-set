import { db } from 'src/lib/db'

export const words = () => {
  return db.word.findMany()
}

export const word = ({ id }) => {
  return db.word.findUnique({
    where: { id },
  })
}

export const createWord = ({ input }) => {
  return db.word.create({
    data: input,
  })
}

export const updateWord = ({ id, input }) => {
  return db.word.update({
    data: input,
    where: { id },
  })
}

export const deleteWord = ({ id }) => {
  return db.word.delete({
    where: { id },
  })
}

export const Word = {
  cards: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).cards()
  },
}
