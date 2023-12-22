import {
  meanings,
  meaning,
  createMeaning,
  updateMeaning,
  deleteMeaning,
} from './meanings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('meanings', () => {
  scenario('returns all meanings', async (scenario) => {
    const result = await meanings()

    expect(result.length).toEqual(Object.keys(scenario.meaning).length)
  })

  scenario('returns a single meaning', async (scenario) => {
    const result = await meaning({ id: scenario.meaning.one.id })

    expect(result).toEqual(scenario.meaning.one)
  })

  scenario('creates a meaning', async (scenario) => {
    const result = await createMeaning({
      input: {
        definition: 'String',
        example: 'String',
        cefrLevel: 'String',
        partOfSpeech: 'String',
        translation: 'String',
        wordId: scenario.meaning.two.wordId,
      },
    })

    expect(result.definition).toEqual('String')
    expect(result.example).toEqual('String')
    expect(result.cefrLevel).toEqual('String')
    expect(result.partOfSpeech).toEqual('String')
    expect(result.translation).toEqual('String')
    expect(result.wordId).toEqual(scenario.meaning.two.wordId)
  })

  scenario('updates a meaning', async (scenario) => {
    const original = await meaning({ id: scenario.meaning.one.id })
    const result = await updateMeaning({
      id: original.id,
      input: { definition: 'String2' },
    })

    expect(result.definition).toEqual('String2')
  })

  scenario('deletes a meaning', async (scenario) => {
    const original = await deleteMeaning({
      id: scenario.meaning.one.id,
    })
    const result = await meaning({ id: original.id })

    expect(result).toEqual(null)
  })
})
