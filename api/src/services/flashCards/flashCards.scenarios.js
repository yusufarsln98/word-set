export const standard = defineScenario({
  flashCard: {
    one: {
      data: {
        word: {
          create: {
            term: 'String',
            dictionary: { create: { dictionary: 'String2506971' } },
          },
        },
        set: {
          create: {
            title: 'String',
            description: 'String',
            updatedAt: '2023-12-21T18:20:15.154Z',
            termsLanguage: 'English',
            translationsLanguage: 'English',
            user: {
              create: {
                name: 'String',
                username: 'String3285436',
                email: 'String7583235',
                hashedPassword: 'String',
                salt: 'String',
                daysStudied: '2023-12-21T18:20:15.154Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        word: {
          create: {
            term: 'String',
            dictionary: { create: { dictionary: 'String3194245' } },
          },
        },
        set: {
          create: {
            title: 'String',
            description: 'String',
            updatedAt: '2023-12-21T18:20:15.154Z',
            termsLanguage: 'English',
            translationsLanguage: 'English',
            user: {
              create: {
                name: 'String',
                username: 'String661411',
                email: 'String5204889',
                hashedPassword: 'String',
                salt: 'String',
                daysStudied: '2023-12-21T18:20:15.154Z',
              },
            },
          },
        },
      },
    },
  },
})
