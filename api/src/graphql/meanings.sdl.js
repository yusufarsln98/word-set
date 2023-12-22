export const schema = gql`
  type Meaning {
    id: Int!
    definition: String!
    example: String!
    cefrLevel: String!
    partOfSpeech: String!
    translation: String!
    word: Word!
    wordId: Int!
  }

  type Query {
    meanings: [Meaning!]! @requireAuth
    meaning(id: Int!): Meaning @requireAuth
  }

  input CreateMeaningInput {
    definition: String!
    example: String!
    cefrLevel: String!
    partOfSpeech: String!
    translation: String!
    wordId: Int!
  }

  input UpdateMeaningInput {
    definition: String
    example: String
    cefrLevel: String
    partOfSpeech: String
    translation: String
    wordId: Int
  }

  type Mutation {
    createMeaning(input: CreateMeaningInput!): Meaning! @requireAuth
    updateMeaning(id: Int!, input: UpdateMeaningInput!): Meaning! @requireAuth
    deleteMeaning(id: Int!): Meaning! @requireAuth
  }
`
