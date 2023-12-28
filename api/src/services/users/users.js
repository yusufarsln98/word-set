import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userSetsWithoutWord = async ({ input }) => {
  // const user = await db.user.findUnique({
  //   where: { id: input.userId },
  // })

  // // get all sets that the user has
  // const user = await db.user.findUnique({
  //   where: { id: input.userId },
  //   include: { sets: true },
  // })

  // get all sets that the user has and flashcards in each set
  const user = await db.user.findUnique({
    where: { id: input.userId },
    include: { sets: { include: { flashCards: true } } },
  })
  const { sets } = user

  let setsWithoutWord = sets

  for (const set of setsWithoutWord) {
    const flashcards = set.flashCards
    // remove that set from setsWithoutWord
    for (const flashcard of flashcards) {
      if (flashcard.wordId === input.wordId) {
        setsWithoutWord = setsWithoutWord.filter((s) => s.id !== set.id)
      }
    }
  }

  return setsWithoutWord
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  userConfig: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).userConfig()
  },
  dictionary: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).dictionary()
  },
  folders: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).folders()
  },
  sets: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).sets()
  },
}
