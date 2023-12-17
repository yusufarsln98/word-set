export const schema = gql`
  type Set {
    id: Int!
    title: String!
    description: String!
    creatorId: Int!
    termsLanguage: Language!
    translationsLanguage: Language!
    folder: Folder
    folderId: Int
    flashCards: [FlashCard]!
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
    sets: [Set!]! @requireAuth
    set(id: Int!): Set @requireAuth
  }

  input CreateSetInput {
    title: String!
    description: String!
    creatorId: Int!
    termsLanguage: Language!
    translationsLanguage: Language!
    folderId: Int
  }

  input UpdateSetInput {
    title: String
    description: String
    creatorId: Int
    termsLanguage: Language
    translationsLanguage: Language
    folderId: Int
  }

  type Mutation {
    createSet(input: CreateSetInput!): Set! @requireAuth
    updateSet(id: Int!, input: UpdateSetInput!): Set! @requireAuth
    deleteSet(id: Int!): Set! @requireAuth
  }
`
