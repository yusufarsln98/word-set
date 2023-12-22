export const schema = gql`
  type UserConfig {
    id: Int!
    avatar: Avatar
    avatarId: Int
    defaultAvatarIndex: Int!
    birthday: DateTime
    gender: Gender
    theme: Theme!
    languageNative: Language!
    languageLearning: Language!
    user: User!
    userId: Int!
  }

  enum Gender {
    MALE
    FEMALE
    RATHER_NOT_SAY
    COSTUM
  }

  enum Theme {
    LIGHT
    DARK
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
    userConfigs: [UserConfig!]! @requireAuth
    userConfig(id: Int!): UserConfig @requireAuth
  }

  input CreateUserConfigInput {
    avatarId: Int
    defaultAvatarIndex: Int!
    birthday: DateTime
    gender: Gender
    theme: Theme!
    languageNative: Language!
    languageLearning: Language!
    userId: Int!
  }

  input UpdateUserConfigInput {
    avatarId: Int
    defaultAvatarIndex: Int
    birthday: DateTime
    gender: Gender
    theme: Theme
    languageNative: Language
    languageLearning: Language
    userId: Int
  }

  type Mutation {
    createUserConfig(input: CreateUserConfigInput!): UserConfig! @requireAuth
    updateUserConfig(id: Int!, input: UpdateUserConfigInput!): UserConfig!
      @requireAuth
    deleteUserConfig(id: Int!): UserConfig! @requireAuth
  }
`
