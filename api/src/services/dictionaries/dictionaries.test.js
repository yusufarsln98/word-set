import {
  dictionaries,
  dictionary,
  createDictionary,
  updateDictionary,
  deleteDictionary,
} from './dictionaries'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('dictionaries', () => {
  scenario('returns all dictionaries', async (scenario) => {
    const result = await dictionaries()

    expect(result.length).toEqual(Object.keys(scenario.dictionary).length)
  })

  scenario('returns a single dictionary', async (scenario) => {
    const result = await dictionary({ id: scenario.dictionary.one.id })

    expect(result).toEqual(scenario.dictionary.one)
  })

  scenario('creates a dictionary', async () => {
    const result = await createDictionary({
      input: {
        name: 'String2368986',
        termsLanguage: 'English',
        translationsLanguage: 'English',
      },
    })

    expect(result.name).toEqual('String2368986')
    expect(result.termsLanguage).toEqual('English')
    expect(result.translationsLanguage).toEqual('English')
  })

  scenario('updates a dictionary', async (scenario) => {
    const original = await dictionary({
      id: scenario.dictionary.one.id,
    })
    const result = await updateDictionary({
      id: original.id,
      input: { name: 'String65073392' },
    })

    expect(result.name).toEqual('String65073392')
  })

  scenario('deletes a dictionary', async (scenario) => {
    const original = await deleteDictionary({
      id: scenario.dictionary.one.id,
    })
    const result = await dictionary({ id: original.id })

    expect(result).toEqual(null)
  })
})
