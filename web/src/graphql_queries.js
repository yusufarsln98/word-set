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
        name
        userConfig {
          id
          defaultAvatarIndex
        }
      }
      sets {
        id
        title
        description
      }
    }
  }
`
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
      }
    }
  }
`
export const USER_QUERY_SETS_UNDETAILED = gql`
  query UserSetsUndetailed($userId: Int!) {
    user(id: $userId) {
      id
      sets {
        id
        title
      }
    }
  }
`

export const ADD_SET_TO_FOLDER_MUTATION = gql`
  mutation AddSetToFolderMutation($id: Int!, $input: AddSetToFolderInput!) {
    addSetToFolder(id: $id, input: $input) {
      id
    }
  }
`

export const REMOVE_SET_FROM_FOLDER_MUTATION = gql`
  mutation RemoveSetFromFolderMutation(
    $id: Int!
    $input: RemoveSetFromFolderInput!
  ) {
    removeSetFromFolder(id: $id, input: $input) {
      id
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
export const UPDATE_USER_CONFIG_MUTATION = gql`
  mutation UpdateUserConfigMutation(
    $id: Int!
    $defaultAvatarIndex: Int
    $birthday: DateTime
    $gender: Gender
    $theme: Theme
    $languageNative: Language
    $languageLearning: Language
  ) {
    updateUserConfig(
      id: $id
      input: {
        defaultAvatarIndex: $defaultAvatarIndex
        birthday: $birthday
        gender: $gender
        theme: $theme
        languageNative: $languageNative
        languageLearning: $languageLearning
      }
    ) {
      id
      defaultAvatarIndex
      birthday
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
    $flashCards: [Int]
  ) {
    createSet(
      input: {
        title: $title
        description: $description
        userId: $userId
        termsLanguage: $termsLanguage
        translationsLanguage: $translationsLanguage
        flashCards: $flashCards
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
export const QUERY_DICTIONARY_BY_NAME = gql`
  query DictionaryByName($name: String!) {
    dictionaryByName(name: $name) {
      id
      name
      termsLanguage
      translationsLanguage
    }
  }
`
export const CREATE_WORD_MUTATION = gql`
  mutation CreateWordMutation(
    $term: String!
    $dictionaryId: Int!
    $definition: String!
    $example: String!
    $cefrLevel: String!
    $partOfSpeech: String!
    $translation: String!
  ) {
    createWord(
      input: {
        term: $term
        dictionaryId: $dictionaryId
        cefrLevel: $cefrLevel
        definition: $definition
        example: $example
        translation: $translation
        partOfSpeech: $partOfSpeech
      }
    ) {
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
export const CREATE_MEANING_MUTATION = gql`
  mutation CreateMeaningMutation(
    $definition: String!
    $cefrLevel: String!
    $partOfSpeech: String!
    $example: String!
    $translation: String!
    $wordId: Int!
  ) {
    createMeaning(
      input: {
        definition: $definition
        cefrLevel: $cefrLevel
        partOfSpeech: $partOfSpeech
        example: $example
        translation: $translation
        wordId: $wordId
      }
    ) {
      id
      definition
      cefrLevel
      partOfSpeech
      example
      translation
    }
  }
`
export const DELETE_WORD_MUTATION = gql`
  mutation DeleteWordMutation($id: Int!) {
    deleteWord(id: $id) {
      id
    }
  }
`
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
