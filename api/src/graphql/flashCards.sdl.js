export const schema = gql`
  type FlashCard {
    id: Int!
    term: String!
    card: Card!
    cardId: Int!
    boost: Float!
    set: Set!
    setId: Int!
  }

  type Query {
    flashCards: [FlashCard!]! @requireAuth
    flashCard(id: Int!): FlashCard @requireAuth
  }

  input CreateFlashCardInput {
    term: String!
    cardId: Int!
    boost: Float!
    setId: Int!
  }

  input UpdateFlashCardInput {
    term: String
    cardId: Int
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
