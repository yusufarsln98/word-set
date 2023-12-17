export const schema = gql`
  type Card {
    id: Int!
    translation: String!
    definition: String!
    example: String!
    cefrLevel: String!
    partOfSpeech: String!
    word: Word!
    wordId: Int!
    flashCards: [FlashCard]!
  }

  type Query {
    cards: [Card!]! @requireAuth
    card(id: Int!): Card @requireAuth
  }

  input CreateCardInput {
    translation: String!
    definition: String!
    example: String!
    cefrLevel: String!
    partOfSpeech: String!
    wordId: Int!
  }

  input UpdateCardInput {
    translation: String
    definition: String
    example: String
    cefrLevel: String
    partOfSpeech: String
    wordId: Int
  }

  type Mutation {
    createCard(input: CreateCardInput!): Card! @requireAuth
    updateCard(id: Int!, input: UpdateCardInput!): Card! @requireAuth
    deleteCard(id: Int!): Card! @requireAuth
  }
`
