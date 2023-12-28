import { useEffect } from 'react'

import { Flex, Layout } from 'antd'
import Title from 'antd/es/typography/Title'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { USER_QUERY_FOLDERS, USER_QUERY_SETS } from 'src/graphql_queries'

const { Content } = Layout

import CardListOfUser, {
  CardListSkeleton,
} from './CardListOfUser/CardListOfUser'
import Dictionary from './Dictionary/Dictionary'

export const HOMEPAGE_USER_QUERY = gql`
  query UserQuery($id: Int!) {
    user(id: $id) {
      id
      name
      username
      email
      userConfig {
        id
        defaultAvatarIndex
      }
      folders {
        id
        title
        description
        createdAt
        sets {
          id
        }
      }
      sets {
        id
        title
        description
        createdAt
        flashCards {
          id
        }
      }
    }
  }
`

const HomePage = () => {
  const currentUser = useAuth().currentUser
  const { languageLearning, languageNative } = useAuth().currentUser.userConfig

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(HOMEPAGE_USER_QUERY, {
    variables: { id: currentUser.id },
  })
  const { folders, sets } = userData?.user ?? {}
  const user = { ...userData?.user }

  return (
    <>
      <MetaTags
        title="Home"
        description="WordSet is a language learning platform."
      />
      <Dictionary
        languageNative={languageNative}
        languageLearning={languageLearning}
      />
      <Content>
        <Flex vertical style={{ marginTop: 20 }} gap={24}>
          <Flex vertical>
            <Title level={4}>Your Folders</Title>
            {userLoading ? (
              <CardListSkeleton asymetric />
            ) : (
              <CardListOfUser data={folders ?? []} user={user} />
            )}
          </Flex>
          <Flex vertical>
            <Title level={4}>Your Sets</Title>
            {userLoading ? (
              <CardListSkeleton />
            ) : (
              <CardListOfUser data={sets ?? []} user={user} />
            )}
          </Flex>
        </Flex>
      </Content>
    </>
  )
}

export default HomePage

// Card List Skeleton
