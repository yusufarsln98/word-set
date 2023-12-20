export const schema = gql`
  type Folder {
    id: Int!
    title: String!
    description: String!
    createdAt: DateTime!
    user: User!
    userId: Int!
    sets: [Set]!
  }

  type Query {
    folders: [Folder!]! @requireAuth
    folder(id: Int!): Folder @requireAuth
  }

  input CreateFolderInput {
    title: String!
    description: String!
    userId: Int!
  }

  input UpdateFolderInput {
    title: String
    description: String
    userId: Int
  }

  type Mutation {
    createFolder(input: CreateFolderInput!): Folder! @requireAuth
    updateFolder(id: Int!, input: UpdateFolderInput!): Folder! @requireAuth
    deleteFolder(id: Int!): Folder! @requireAuth
  }
`
