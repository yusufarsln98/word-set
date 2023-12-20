import {
  folders,
  folder,
  createFolder,
  updateFolder,
  deleteFolder,
} from './folders'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('folders', () => {
  scenario('returns all folders', async (scenario) => {
    const result = await folders()

    expect(result.length).toEqual(Object.keys(scenario.folder).length)
  })

  scenario('returns a single folder', async (scenario) => {
    const result = await folder({ id: scenario.folder.one.id })

    expect(result).toEqual(scenario.folder.one)
  })

  scenario('creates a folder', async (scenario) => {
    const result = await createFolder({
      input: {
        title: 'String',
        description: 'String',
        userId: scenario.folder.two.userId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.userId).toEqual(scenario.folder.two.userId)
  })

  scenario('updates a folder', async (scenario) => {
    const original = await folder({ id: scenario.folder.one.id })
    const result = await updateFolder({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a folder', async (scenario) => {
    const original = await deleteFolder({
      id: scenario.folder.one.id,
    })
    const result = await folder({ id: original.id })

    expect(result).toEqual(null)
  })
})
