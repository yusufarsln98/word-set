import { BlockOutlined } from '@ant-design/icons'
import { Card, Flex, Select } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import styles from 'src/Global.module.scss'
import { USER_QUERY_SETS } from 'src/graphql'

import { HorizontalCardSkeleton } from '../FoldersPage/FoldersPage'

const SetsPage = ({ userId }) => {
  const { data, loading, error } = useQuery(USER_QUERY_SETS, {
    variables: { userId },
  })
  console.log('user data', data?.user?.sets)
  return (
    <>
      <MetaTags title="Sets" description="Sets page" />
      <Flex vertical gap={16}>
        <Select
          disabled
          defaultValue="Created"
          style={{
            width: 120,
          }}
          title="TODO: Add filter"
        />
        {loading ? (
          <>
            <HorizontalCardSkeleton />
          </>
        ) : (
          <>
            <SetsList sets={data?.user?.sets} />
          </>
        )}
      </Flex>
    </>
  )
}

export default SetsPage

const SetsList = ({ sets }) => {
  return (
    <Flex vertical gap={8}>
      {sets?.map((set) => (
        <HorizontalSetCard key={set.id} set={set} />
      ))}
    </Flex>
  )
}

const HorizontalSetCard = ({ set }) => {
  return (
    <>
      <Link to={routes.set({ setId: set.id })}>
        <Card
          style={{
            width: '100%',
          }}
          size="small"
          className={styles.hoverable}
        >
          <Flex vertical gap={2}>
            <p>
              {set.flashCards.length}
              <> </>
              {set.flashCards.length === 1 ? 'set' : 'sets'}
            </p>
            <Flex gap={8} align="center" justify="start">
              <BlockOutlined
                style={{
                  fontSize: '16px',
                }}
              />
              <p>{set.title}</p>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </>
  )
}
