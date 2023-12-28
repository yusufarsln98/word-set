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
    dictionaries: [Dictionary!]! @skipAuth
    dictionary(id: Int!): Dictionary @skipAuth
    dictionaryByName(name: String!): Dictionary @skipAuth
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
    createDictionary(input: CreateDictionaryInput!): Dictionary! @skipAuth
    updateDictionary(id: Int!, input: UpdateDictionaryInput!): Dictionary!
      @skipAuth
    deleteDictionary(id: Int!): Dictionary! @skipAuth
  }
`
