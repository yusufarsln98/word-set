import { db } from 'src/lib/db'

export const sets = () => {
  return db.set.findMany()
}

export const set = ({ id }) => {
  return db.set.findUnique({
    where: { id },
  })
}

export const createSet = async ({ input }) => {
  // console.log('input', input.flashCards)
  const flashCards = input.flashCards // get cards ids

  // get flashCards from DB
  const flashCardsFromDB = await db.flashCard.findMany({
    where: { id: { in: flashCards } },
  })

  // remove flashCards from input
  delete input.flashCards

  // create set and connect flashcards to set
  const set = await db.set.create({
    data: {
      ...input,
      flashCards: {
        connect: flashCardsFromDB.map((card) => ({ id: card.id })),
      },
    },
  })

  return set
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
  user: (_obj, { root }) => {
    return db.set.findUnique({ where: { id: root?.id } }).user()
  },
  flashCards: (_obj, { root }) => {
    return db.set.findUnique({ where: { id: root?.id } }).flashCards()
  },
}
