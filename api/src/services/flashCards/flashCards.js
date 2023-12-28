import { db } from 'src/lib/db'

export const flashCards = () => {
  return db.flashCard.findMany()
}

export const flashCard = ({ id }) => {
  return db.flashCard.findUnique({
    where: { id },
  })
}

export const createFlashCard = async ({ input }) => {
  // if word is already in set, return error
  const flashcard = await db.flashCard.findFirst({
    where: { wordId: input.wordId, setId: input.setId },
  })

  if (flashcard) {
    throw new Error('Word already in set')
  }

  return db.flashCard.create({
    data: {
      ...input,
      boost: 1,
    },
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
