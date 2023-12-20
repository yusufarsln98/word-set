import { Card, Flex, Layout, Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'

// import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { USER_QUERY_FOLDERS, USER_QUERY_SETS } from 'src/graphql'

const { Content } = Layout

import CardListOfUser, {
  CardListSkeleton,
} from './CardListOfUser/CardListOfUser'
import Dictionary from './Dictionary/Dictionary'

const LatestPage = () => {
  const { languageLearning, languageNative } = useAuth().currentUser.userConfig
  const user = useAuth().currentUser
  // const {
  //   token: { colorBgContainer, colorBgLayout, boxShadowTertiary },
  // } = theme.useToken()

  // get folders
  const {
    data: userFoldersData,
    loading: userFoldersLoading,
    error: userFoldersError,
  } = useQuery(USER_QUERY_FOLDERS, {
    variables: { userId: user.id },
  })

  // get sets
  const {
    data: userSetsData,
    loading: userSetsLoading,
    error: userSetsError,
  } = useQuery(USER_QUERY_SETS, {
    variables: { userId: user.id },
  })

  return (
    <>
      <MetaTags title="Latest" description="Latest page" />
      <Dictionary
        languageNative={languageNative}
        languageLearning={languageLearning}
      />
      <Content>
        <Flex vertical style={{ marginTop: 20 }} gap={24}>
          <Flex vertical>
            <Title level={4}>Your Folders</Title>
            {userFoldersLoading ? (
              <CardListSkeleton asymetric />
            ) : (
              <CardListOfUser
                data={userFoldersData?.user?.folders ?? []}
                quantity={[
                  userFoldersData?.user?.folders?.sets?.length ?? 0,
                  userFoldersData?.user?.folders?.sets?.length === 1
                    ? 'set'
                    : 'sets',
                ]}
              />
            )}
          </Flex>
          <Flex vertical>
            <Title level={4}>Your Sets</Title>
            {userSetsLoading ? (
              <CardListSkeleton />
            ) : (
              <CardListOfUser
                data={userSetsData?.user?.sets ?? []}
                quantity={[
                  userSetsData?.user?.sets?.flashCards?.length ?? 0,
                  userSetsData?.user?.sets?.flashCards?.length === 1
                    ? 'flashcard'
                    : 'flashcards',
                ]}
              />
            )}
          </Flex>
        </Flex>
      </Content>
    </>
  )
}

export default LatestPage

// Card List Skeleton
