import { gray } from '@ant-design/colors'
import { FolderOutlined } from '@ant-design/icons'
import { Card, Divider, Empty, Flex, Select, Skeleton, Tag } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

// import folder icon
import styles from 'src/Global.module.scss'
import { USER_QUERY_FOLDERS } from 'src/graphql_queries'
import { printDateToLocaleStringWithoutDay } from 'src/utility'

const FoldersPage = ({ userId }) => {
  const { data, loading, error } = useQuery(USER_QUERY_FOLDERS, {
    variables: { userId },
  })
  const { folders } = data?.user || []

  return (
    <>
      <MetaTags title="Folders" description="Folders page" />
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
            {folders?.length > 0 ? (
              <>
                <VerticalList data={folders} />
              </>
            ) : (
              <Empty description={<p>You don&apos;t have any folders yet</p>} />
            )}
          </>
        )}
      </Flex>
    </>
  )
}

export default FoldersPage

export const VerticalList = ({ data }) => {
  let previousMonth = null
  return (
    <Flex vertical gap={8}>
      {data?.map((instance) => {
        const currentMonth = new Date(instance.createdAt).getMonth()

        const shouldPrintDate = currentMonth !== previousMonth
        previousMonth = currentMonth

        const formattedDate = printDateToLocaleStringWithoutDay(
          new Date(instance.createdAt)
        )
        return (
          <div key={instance.id}>
            {shouldPrintDate && (
              <Divider orientation="left">{formattedDate}</Divider>
            )}
            <TheCard key={instance.id} instance={instance} />
          </div>
        )
      })}
    </Flex>
  )
}

const TheCard = ({ instance }) => {
  return (
    <>
      <Link
        to={
          instance.__typename === 'Set'
            ? routes.set({ setId: instance.id })
            : routes.folder({ folderId: instance.id })
        }
      >
        <Card
          style={{
            width: '100%',
          }}
          size="small"
          className={styles.hoverable}
        >
          <Flex vertical gap={2}>
            <p
              style={{
                fontSize: '12px',
                color: gray[5],
                marginBottom: '0px',
              }}
            >
              {instance.__typename === 'Folder'
                ? `${instance.sets.length} set` +
                  `${instance.sets.length != 1 ? 's' : ''}`
                : `${instance.flashCards.length} flashcard` +
                  `${instance.flashCards.length != 1 ? 's' : ''}`}
            </p>
            <Flex gap={16} align="center" justify="start">
              <FolderOutlined
                style={{
                  fontSize: '24px',
                  color: gray[1],
                }}
              />
              <p style={{ fontSize: '16px' }}>{instance.title}</p>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </>
  )
}

export const VerticalListSkeleton = () => {
  return (
    <>
      <Flex vertical gap={8}>
        <Card style={{ backgroundColor: 'transparent' }} size="small" loading />
        <Card style={{ backgroundColor: 'transparent' }} size="small" loading />
      </Flex>
    </>
  )
}
