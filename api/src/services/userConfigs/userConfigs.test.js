import {
  userConfigs,
  userConfig,
  createUserConfig,
  updateUserConfig,
  deleteUserConfig,
} from './userConfigs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userConfigs', () => {
  scenario('returns all userConfigs', async (scenario) => {
    const result = await userConfigs()

    expect(result.length).toEqual(Object.keys(scenario.userConfig).length)
  })

  scenario('returns a single userConfig', async (scenario) => {
    const result = await userConfig({ id: scenario.userConfig.one.id })

    expect(result).toEqual(scenario.userConfig.one)
  })

  scenario('creates a userConfig', async (scenario) => {
    const result = await createUserConfig({
      input: {
        languageNative: 'English',
        languageLearning: 'English',
        userId: scenario.userConfig.two.userId,
      },
    })

    expect(result.languageNative).toEqual('English')
    expect(result.languageLearning).toEqual('English')
    expect(result.userId).toEqual(scenario.userConfig.two.userId)
  })

  scenario('updates a userConfig', async (scenario) => {
    const original = await userConfig({
      id: scenario.userConfig.one.id,
    })
    const result = await updateUserConfig({
      id: original.id,
      input: { languageNative: 'Japanese' },
    })

    expect(result.languageNative).toEqual('Japanese')
  })

  scenario('deletes a userConfig', async (scenario) => {
    const original = await deleteUserConfig({
      id: scenario.userConfig.one.id,
    })
    const result = await userConfig({ id: original.id })

    expect(result).toEqual(null)
  })
})
