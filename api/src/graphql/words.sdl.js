export const schema = gql`
  type Word {
    id: Int!
    term: String!
    termSearch: String!
    termsLanguage: Language!
    translationsLanguage: Language!
    cards: [Card]!
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
    words: [Word!]! @requireAuth
    word(id: Int!): Word @requireAuth
  }

  input CreateWordInput {
    term: String!
    termSearch: String!
    termsLanguage: Language!
    translationsLanguage: Language!
  }

  input UpdateWordInput {
    term: String
    termSearch: String
    termsLanguage: Language
    translationsLanguage: Language
  }

  type Mutation {
    createWord(input: CreateWordInput!): Word! @requireAuth
    updateWord(id: Int!, input: UpdateWordInput!): Word! @requireAuth
    deleteWord(id: Int!): Word! @requireAuth
  }
`
