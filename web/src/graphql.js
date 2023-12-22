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

export const CREATE_SET_MUTATION = gql`
  mutation CreateSetMutation(
    $title: String!
    $description: String!
    $userId: Int!
    $termsLanguage: Language!
    $translationsLanguage: Language!
  ) {
    createSet(
      input: {
        title: $title
        description: $description
        userId: $userId
        termsLanguage: $termsLanguage
        translationsLanguage: $translationsLanguage
      }
    ) {
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
      flashCards {
        id
      }
    }
  }
`

// create dictionary
export const CREATE_DICTIONARY_MUTATION = gql`
  mutation CreateDictionaryMutation(
    $name: String!
    $termsLanguage: Language!
    $translationsLanguage: Language!
  ) {
    createDictionary(
      input: {
        name: $name
        termsLanguage: $termsLanguage
        translationsLanguage: $translationsLanguage
      }
    ) {
      id
      name
      termsLanguage
      translationsLanguage
    }
  }
`
export const QUERY_DICTIONARIES = gql`
  query DictionariesQuery {
    dictionaries {
      id
      name
      termsLanguage
      translationsLanguage
    }
  }
`

export const QUERY_DICTIONARY = gql`
  query DictionaryQuery($id: Int!) {
    dictionary(id: $id) {
      id
      name
      termsLanguage
      translationsLanguage
      words {
        id
        term
        search
        meanings {
          id
          definition
          example
          cefrLevel
          partOfSpeech
          translation
        }
      }
    }
  }
`

// dictionary by name
export const QUERY_DICTIONARY_BY_NAME = gql`
  query DictionaryByName($name: String!) {
    dictionaryByName(name: $name) {
      id
      name
      termsLanguage
      translationsLanguage
      words {
        id
        term
        search
        meanings {
          id
          definition
          example
          cefrLevel
          partOfSpeech
          translation
        }
      }
    }
  }
`

// create word
export const CREATE_WORD_MUTATION = gql`
  mutation CreateWordMutation($term: String!, $dictionaryId: Int!) {
    createWord(input: { term: $term, dictionaryId: $dictionaryId }) {
      id
      term
      search
    }
  }
`

// delete word
export const DELETE_WORD_MUTATION = gql`
  mutation DeleteWordMutation($id: Int!) {
    deleteWord(id: $id) {
      id
    }
  }
`

// get word
export const QUERY_WORD = gql`
  query WordQuery($id: Int!) {
    word(id: $id) {
      id
      term
      search
      meanings {
        id
        definition
        example
        cefrLevel
        partOfSpeech
        translation
      }
    }
  }
`

// get word by search
export const QUERY_WORD_BY_SEARCH = gql`
  query WordBySearch($search: String!) {
    wordBySearch(search: $search) {
      id
      term
      search
      meanings {
        id
        definition
        example
        cefrLevel
        partOfSpeech
        translation
      }
    }
  }
`
