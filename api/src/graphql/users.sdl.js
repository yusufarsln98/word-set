export const schema = gql`
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [Role]!
    createdAt: DateTime!
    daysStudied: [DateTime]!
    userConfig: UserConfig
    dictionary: Dictionary!
    dictionaryId: Int!
    folders: [Folder]!
    sets: [Set]!
  }

  enum Role {
    ADMIN
    PREMIUM_USER
    USER
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String!
    username: String!
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [Role]!
    daysStudied: [DateTime]!
    dictionaryId: Int!
  }

  input UpdateUserInput {
    name: String
    username: String
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [Role]!
    daysStudied: [DateTime]!
    dictionaryId: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
