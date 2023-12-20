export const schema = gql`
  type FlashCard {
    id: Int!
    term: String!
    termsLanguage: Language!
    translationsLanguage: Language!
    card: Card!
    cardId: Int!
    boost: Float!
    set: Set!
    setId: Int!
  }

  enum Language {
    English
    French
    Turkish
    Spanish
    German
    Italian
    Portuguese
    Japanese
  }

  enum Language {
    English
    French
    Turkish
    Spanish
    German
    Italian
    Portuguese
    Japanese
  }

  type Query {
    flashCards: [FlashCard!]! @requireAuth
    flashCard(id: Int!): FlashCard @requireAuth
  }

  input CreateFlashCardInput {
    term: String!
    termsLanguage: Language!
    translationsLanguage: Language!
    cardId: Int!
    boost: Float!
    setId: Int!
  }

  input UpdateFlashCardInput {
    term: String
    termsLanguage: Language
    translationsLanguage: Language
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
