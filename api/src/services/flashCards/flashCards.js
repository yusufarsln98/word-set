import { db } from 'src/lib/db'

export const flashCards = () => {
  return db.flashCard.findMany()
}

export const flashCard = ({ id }) => {
  return db.flashCard.findUnique({
    where: { id },
  })
}

export const createFlashCard = ({ input }) => {
  return db.flashCard.create({
    data: input,
  })
}

export const updateFlashCard = ({ id, input }) => {
  return db.flashCard.update({
    data: input,
    where: { id },
  })
}

export const deleteFlashCard = ({ id }) => {
  return db.flashCard.delete({
    where: { id },
  })
}

export const FlashCard = {
  word: (_obj, { root }) => {
    return db.flashCard.findUnique({ where: { id: root?.id } }).word()
  },
  set: (_obj, { root }) => {
    return db.flashCard.findUnique({ where: { id: root?.id } }).set()
  },
}
