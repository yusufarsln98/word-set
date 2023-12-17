export const schema = gql`
  type Avatar {
    id: Int!
    data: String!
    userConfig: [UserConfig]!
  }

  type Query {
    avatars: [Avatar!]! @requireAuth
    avatar(id: Int!): Avatar @requireAuth
  }

  input CreateAvatarInput {
    data: String!
  }

  input UpdateAvatarInput {
    data: String
  }

  type Mutation {
    createAvatar(input: CreateAvatarInput!): Avatar! @requireAuth
    updateAvatar(id: Int!, input: UpdateAvatarInput!): Avatar! @requireAuth
    deleteAvatar(id: Int!): Avatar! @requireAuth
  }
`
