export const schema = gql`
  type Word {
    id: Int!
    term: String!
    search: String!
    dictionary: Dictionary!
    dictionaryId: Int!
    meanings: [Meaning]!
    flashCards: [FlashCard]!
  }

  type Query {
    words: [Word!]! @requireAuth
    word(id: Int!): Word @requireAuth
    wordBySearch(search: String!): Word @requireAuth
  }

  input CreateWordInput {
    term: String!
    dictionaryId: Int!

    # a meaning also have to be provided when creating a word
    # however, the meaning wants a wordId, which is not known.
    # therefore, the meaning is created in the resolver. other fields
    # are provided here
    definition: String!
    example: String!
    cefrLevel: String!
    partOfSpeech: String!
    translation: String!
  }

  input UpdateWordInput {
    term: String
    dictionaryId: Int
  }

  type Mutation {
    createWord(input: CreateWordInput!): Word! @requireAuth
    updateWord(id: Int!, input: UpdateWordInput!): Word! @requireAuth
    deleteWord(id: Int!): Word! @requireAuth
  }
`
