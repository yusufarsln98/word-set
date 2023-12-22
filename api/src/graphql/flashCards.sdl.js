export const schema = gql`
  type FlashCard {
    id: Int!
    word: Word!
    wordId: Int!
    meaningIndex: Int!
    boost: Float!
    set: Set!
    setId: Int!
  }

  type Query {
    flashCards: [FlashCard!]! @requireAuth
    flashCard(id: Int!): FlashCard @requireAuth
  }

  input CreateFlashCardInput {
    wordId: Int!
    meaningIndex: Int!
    boost: Float!
    setId: Int!
  }

  input UpdateFlashCardInput {
    wordId: Int
    meaningIndex: Int
    boost: Float
    setId: Int
  }

  type Mutation {
    createFlashCard(input: CreateFlashCardInput!): FlashCard! @requireAuth
    updateFlashCard(id: Int!, input: UpdateFlashCardInput!): FlashCard!
      @requireAuth
    deleteFlashCard(id: Int!): FlashCard! @requireAuth
  }
`
