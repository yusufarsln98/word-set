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
