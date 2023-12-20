export const FOLDERS_QUERY = gql`
  query FoldersQuery {
    folders {
      id
      title
      description
      createdAt
    }
  }
`

export const FOLDER_QUERY = gql`
  query FolderQuery($id: Int!) {
    folder(id: $id) {
      id
      title
      description
      createdAt
      user {
        id
        username
        userConfig {
          id
          defaultAvatarIndex
        }
      }
      sets {
        id
      }
    }
  }
`
// create folder
export const CREATE_FOLDER_MUTATION = gql`
  mutation CreateFolderMutation(
    $title: String!
    $description: String!
    $userId: Int!
  ) {
    createFolder(
      input: { title: $title, description: $description, userId: $userId }
    ) {
      id
      title
      description
      createdAt
    }
  }
`

export const USER_QUERY_FOLDERS = gql`
  query UserFolders($userId: Int!) {
    user(id: $userId) {
      id
      folders {
        id
        title
        description
        createdAt
        sets {
          id
        }
        userId
        user {
          id
          username
          userConfig {
            id
            defaultAvatarIndex
          }
        }
      }
    }
  }
`

export const USER_QUERY_SETS = gql`
  query UserSets($userId: Int!) {
    user(id: $userId) {
      id
      sets {
        id
        title
        description
        createdAt
        flashCards {
          id
        }
        userId
        user {
          id
          username
          userConfig {
            id
            defaultAvatarIndex
          }
        }
      }
    }
  }
`

export const USER_QUERY_UNDETAILED = gql`
  query UndetailedUserQuery($id: Int!) {
    user(id: $id) {
      id
      name
      username
      userConfig {
        id
        defaultAvatarIndex
      }
    }
  }
`

export const USER_QUERY_ACTIVITY = gql`
  query UserActivity($userId: Int!) {
    user(id: $userId) {
      id
      daysStudied
    }
  }
`
