import { db } from 'src/lib/db'

export const words = () => {
  return db.word.findMany()
}

export const word = ({ id }) => {
  return db.word.findUnique({
    where: { id },
  })
}

export const wordBySearch = ({ search }) => {
  return db.word.findUnique({
    where: { search },
  })
}

export const createWord = async ({ input }) => {
  // get dictionary name from input dictionaryId
  const dictionary = await db.dictionary.findUnique({
    where: { id: input.dictionaryId },
  })

  const search = `${input.term}-${dictionary.name}`

  // check if word already exists
  const word = await db.word.findUnique({
    where: { search },
  })

  // if word already exists, return it
  if (word) {
    return word
  }

  // if word does not exist, create it
  return db.word.create({
    data: {
      dictionary: { connect: { id: input.dictionaryId } },
      term: input.term,
      search,
    },
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
  dictionary: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).dictionary()
  },
  meanings: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).meanings()
  },
  flashCards: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).flashCards()
  },
}
