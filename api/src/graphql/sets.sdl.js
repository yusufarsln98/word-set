export const schema = gql`
  type Set {
    id: Int!
    title: String!
    description: String!
    createdAt: DateTime!
    termsLanguage: Language!
    translationsLanguage: Language!
    folder: Folder
    folderId: Int
    user: User
    userId: Int
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
    termsLanguage: Language!
    translationsLanguage: Language!
    userId: Int!
    folderId: Int
    flashCards: [Int] # FlashCard ids to add
  }

  input UpdateSetInput {
    title: String
    description: String
    termsLanguage: Language
    translationsLanguage: Language
    folderId: Int
    userId: Int
  }

  type Mutation {
    createSet(input: CreateSetInput!): Set! @requireAuth
    updateSet(id: Int!, input: UpdateSetInput!): Set! @requireAuth
    deleteSet(id: Int!): Set! @requireAuth
  }
`
