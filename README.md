# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Cloning the Project:

```
git clone https://github.com/yusufarsln98/word-set.git
```

or just download the folder and go to the root folder.

Start by installing dependencies:

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command! From dev to deploy, the CLI is with you the whole way. And there's quite a few commands at your disposal:
>
> ```
> yarn redwood --help
> ```
>
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood generate scaffold post
```

Navigate to [http://localhost:8910/posts/new](http://localhost:8910/posts/new), fill in the title and body, and click "Save".

Did we just create a post in the database? Yup! With `yarn rw generate scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like? That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data. Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Seeing "Couldn't find any stories"? That's because you need a `*.stories.{tsx,jsx}` file. The Redwood CLI makes getting one easy enough—try generating a [Cell](https://redwoodjs.com/docs/cells), Redwood's data-fetching abstraction:

```
yarn rw generate cell examplePosts
```

The Storybook server should hot reload and now you'll have four stories to work with. They'll probably look a little bland since there's no styling. See if the Redwood CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests. Redwood fully integrates Jest with both the front- and back-ends, and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth! Lock down your app with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third-party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)


# WordSet - Language Learning Application

![WordSet](https://raw.githubusercontent.com/yusufarsln98/word-set/master/_assets/Logo.png)


## Introduction

A great tool for people learning a new language. Learning new words can be tough. You look them up in a dictionary, try to remember them, but soon forget. Some people write these words in notebooks or make study sets online. But as the list of unfamiliar words grows, it can get overwhelming. WordSet is different. It keeps a list of words and their meanings and turns them into study sets automatically with the help of technology. It makes learning words fun with tests. You can use your own sets or sets made by others, making language learning easier and more enjoyable.


## User Stories and Related Scenarios

**Story #1 – Creating Word Sets**

Azra is a primary school student. At school, her English teacher gave her a list of words to learn this week. Azra needs to learn these words by the weekend. For this reason, Azra wants to create a study set from the word list given by her teacher.

**Scenario #1**

The user enters the application and clicks on the file to which they want to add a word set. If they want to make an addition to a set they previously created, they select the set they want to add to. Afterward, they enhance the set by adding words; if they want to create a new set, they first create a set and then add the word list to it. The application prepares flashcards from these words and makes them ready for the user to work with in different modes.

**Story #2 – Studying on Ready-Made Sets**

Yunus is a nurse, and he wants to improve his English, which is currently at the A2 level. However, he doesn't have the time to create study sets because he's currently working.

**Scenario #2**

The sets created by users become accessible to everyone. Other users can access these sets by using the search feature in the application, or they can select one from the popular sets that are already displayed on the homepage and add it to their own lists. Baskasinin seti calisilmaya baslandiginda, card’larin boost degerleri baslangic degerlerine getirilir ve set kullanicinin listesi olarak kopyalanir.

**Story #3 – Tracking Learning Progress**

Yunus, who has been using this application for a while, wants to learn how often he studies, whether he is studying regularly, how many words he has learned, and which sets he should work on and which ones he should not.

**Scenario #3**

Within the application, there is a calendar that displays the days when the user has been studying. This allows the user to track the days on which they have studied. Additionally, the sets the user has learned will be labeled as "completed" and kept in the list, making it easy for language learners to see which lists they have completed.

## Diagrams
**Use Case Diagram**

![Use Case Diagram](https://raw.githubusercontent.com/yusufarsln98/word-set/master/_assets/WordSet%20-%20Use%20Case%20Diagram.png)

**Class Diagram**

![enter image description here](https://raw.githubusercontent.com/yusufarsln98/word-set/master/_assets/Word%20Set%20-%20Class%20Diagram.png)


## GPT Prompt To Receive Flashcard Object
```js
const getSystemMessage = (mode, [languageLearning, languageNative]) => {
  return `
  You function as a ${languageLearning} dictionary, provided a ${mode} and returning either a 'definition object' or an 'error object'.
  Your task is to determine whether the provided ${mode} is belong to the ${languageLearning} or not.

  If you determine the provided ${mode} belong to the ${languageLearning}, return the 'definition object', otherwise, return the 'error object'.
  Both objects are described below.

  definition object
  {
    "${mode}": ?, [${capitalizeAll(mode)} IN ${languageLearning}]
    "definition": ?, [DEFINITION IN ${languageLearning}]
    "cefrLevel": ?,
    "partOfSpeech": ?,
    "example": ?, [EXAMPLE IN ${languageLearning}]
    "translation": ? [TRANSLATION IN ${languageNative} IN ONE OR A FEW WORDS]
  }

  error object
  {
    "${mode}": ?, ${mode} that you are searching for
    "error": "No definition found."
  }`
}
```


