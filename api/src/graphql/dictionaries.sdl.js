export const schema = gql`
  type Dictionary {
    id: Int!
    name: String!
    termsLanguage: Language!
    translationsLanguage: Language!
    words: [Word]!
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
    dictionaries: [Dictionary!]! @requireAuth
    dictionary(id: Int!): Dictionary @requireAuth
    dictionaryByName(name: String!): Dictionary @requireAuth
  }

  input CreateDictionaryInput {
    name: String!
    termsLanguage: Language!
    translationsLanguage: Language!
  }

  input UpdateDictionaryInput {
    name: String
    termsLanguage: Language
    translationsLanguage: Language
  }

  type Mutation {
    createDictionary(input: CreateDictionaryInput!): Dictionary! @requireAuth
    updateDictionary(id: Int!, input: UpdateDictionaryInput!): Dictionary!
      @requireAuth
    deleteDictionary(id: Int!): Dictionary! @requireAuth
  }
`
