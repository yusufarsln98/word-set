import { BlockOutlined } from '@ant-design/icons'
import { Card, Empty, Flex, Select } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import styles from 'src/Global.module.scss'
import { USER_QUERY_SETS } from 'src/graphql_queries'

import { VerticalList, VerticalListSkeleton } from '../FoldersPage/FoldersPage'

const SetsPage = ({ userId }) => {
  const { data, loading, error } = useQuery(USER_QUERY_SETS, {
    variables: { userId },
  })
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
            <VerticalListSkeleton />
          </>
        ) : (
          <>
            {data.user.sets.length > 0 ? (
              <VerticalList data={data?.user?.sets} />
            ) : (
              <Empty description={<p>You don&apos;t have any sets yet</p>} />
            )}
          </>
        )}
      </Flex>
    </>
  )
}

export default SetsPage
