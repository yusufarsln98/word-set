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
  // get current user from context
  // const user = context.currentUser

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

export const deleteSet = async ({ id }) => {
  // get current user from context, check if the set is belongs to the user
  const user = context.currentUser

  // if set not belongs to user, return error
  const set = await db.set.findUnique({ where: { id } })
  if (set.userId !== user.id) {
    throw new Error('Set not belongs to user')
  }

  // remove all flashcards belongs to the set
  await db.flashCard.deleteMany({ where: { setId: id } })

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
