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
  // destruct input to get, term, dictionaryId, definition, example, cefrLevel, partOfSpeech, translation
  const {
    term,
    dictionaryId,
    definition,
    example,
    cefrLevel,
    partOfSpeech,
    translation,
  } = input

  // get dictionary name from input dictionaryId
  const dictionary = await db.dictionary.findUnique({
    where: { id: dictionaryId },
  })

  // create search string
  const search = `${term}-${dictionary.name}`

  // check if word already exists
  const word = await db.word.findUnique({
    where: { search },
    include: {
      meanings: true,
    },
  })

  // if word already exists, get meanings of the word and compare each with
  // definition of input. if there is a match, return the word, otherwise add
  // the meaning to the word and return the word
  if (word) {
    const meanings = await db.meaning.findMany({
      where: { wordId: word.id },
    })
    const meaning = meanings.find(
      (meaning) => meaning.definition === definition
    )
    if (meaning) {
      return word
    } else {
      await db.meaning.create({
        data: {
          definition: definition,
          example: example,
          cefrLevel: cefrLevel,
          partOfSpeech: partOfSpeech,
          translation: translation,
          wordId: word.id,
        },
      })

      return word
    }
  }

  // if word does not exist, create it and add the meaning to it
  return await db.word.create({
    data: {
      term: term,
      dictionaryId: dictionaryId,
      search: search,
      meanings: {
        create: {
          definition: definition,
          example: example,
          cefrLevel: cefrLevel,
          partOfSpeech: partOfSpeech,
          translation: translation,
        },
      },
    },
  })
}

export const updateWord = ({ id, input }) => {
  return db.word.update({
    data: input,
    where: { id },
  })
}

export const deleteWord = async ({ id }) => {
  // delete word with its all meanings
  await db.meaning.deleteMany({
    where: { wordId: id },
  })

  // delete word
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
