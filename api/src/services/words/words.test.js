import { words, word, createWord, updateWord, deleteWord } from './words'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('words', () => {
  scenario('returns all words', async (scenario) => {
    const result = await words()

    expect(result.length).toEqual(Object.keys(scenario.word).length)
  })

  scenario('returns a single word', async (scenario) => {
    const result = await word({ id: scenario.word.one.id })

    expect(result).toEqual(scenario.word.one)
  })

  scenario('creates a word', async (scenario) => {
    const result = await createWord({
      input: {
        term: 'String',
        search: 'String6783997',
        dictionaryId: scenario.word.two.dictionaryId,
      },
    })

    expect(result.term).toEqual('String')
    expect(result.search).toEqual('String6783997')
    expect(result.dictionaryId).toEqual(scenario.word.two.dictionaryId)
  })

  scenario('updates a word', async (scenario) => {
    const original = await word({ id: scenario.word.one.id })
    const result = await updateWord({
      id: original.id,
      input: { term: 'String2' },
    })

    expect(result.term).toEqual('String2')
  })

  scenario('deletes a word', async (scenario) => {
    const original = await deleteWord({ id: scenario.word.one.id })
    const result = await word({ id: original.id })

    expect(result).toEqual(null)
  })
})
