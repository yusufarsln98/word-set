export const standard = defineScenario({
  meaning: {
    one: {
      data: {
        definition: 'String',
        example: 'String',
        cefrLevel: 'String',
        partOfSpeech: 'String',
        translation: 'String',
        word: {
          create: {
            term: 'String',
            dictionary: { create: { dictionary: 'String6680753' } },
          },
        },
      },
    },
    two: {
      data: {
        definition: 'String',
        example: 'String',
        cefrLevel: 'String',
        partOfSpeech: 'String',
        translation: 'String',
        word: {
          create: {
            term: 'String',
            dictionary: { create: { dictionary: 'String6002835' } },
          },
        },
      },
    },
  },
})
