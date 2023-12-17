import { sets, set, createSet, updateSet, deleteSet } from './sets'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sets', () => {
  scenario('returns all sets', async (scenario) => {
    const result = await sets()

    expect(result.length).toEqual(Object.keys(scenario.set).length)
  })

  scenario('returns a single set', async (scenario) => {
    const result = await set({ id: scenario.set.one.id })

    expect(result).toEqual(scenario.set.one)
  })

  scenario('creates a set', async () => {
    const result = await createSet({
      input: {
        title: 'String',
        description: 'String',
        creatorId: 9384223,
        termsLanguage: 'English',
        translationsLanguage: 'English',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.creatorId).toEqual(9384223)
    expect(result.termsLanguage).toEqual('English')
    expect(result.translationsLanguage).toEqual('English')
  })

  scenario('updates a set', async (scenario) => {
    const original = await set({ id: scenario.set.one.id })
    const result = await updateSet({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a set', async (scenario) => {
    const original = await deleteSet({ id: scenario.set.one.id })
    const result = await set({ id: original.id })

    expect(result).toEqual(null)
  })
})
