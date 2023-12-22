import { db } from 'src/lib/db'

export const dictionaries = () => {
  return db.dictionary.findMany()
}

export const dictionary = ({ id }) => {
  return db.dictionary.findUnique({
    where: { id },
  })
}

export const dictionaryByName = ({ name }) => {
  return db.dictionary.findUnique({
    where: { name },
  })
}

export const createDictionary = ({ input }) => {
  return db.dictionary.create({
    data: input,
  })
}

export const updateDictionary = ({ id, input }) => {
  return db.dictionary.update({
    data: input,
    where: { id },
  })
}

export const deleteDictionary = ({ id }) => {
  return db.dictionary.delete({
    where: { id },
  })
}

export const Dictionary = {
  words: (_obj, { root }) => {
    return db.dictionary.findUnique({ where: { id: root?.id } }).words()
  },
}
