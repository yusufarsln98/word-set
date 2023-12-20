import { FolderOutlined } from '@ant-design/icons'
import { Card, Flex, Select, Skeleton, Tag } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

// import folder icon
import styles from 'src/Global.module.scss'
import { USER_QUERY_FOLDERS } from 'src/graphql'

const FoldersPage = ({ userId }) => {
  const { data, loading, error } = useQuery(USER_QUERY_FOLDERS, {
    variables: { userId },
  })

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
            <HorizontalCardSkeleton />
          </>
        ) : (
          <>
            <FoldersList folders={data?.user?.folders} />
          </>
        )}
      </Flex>
    </>
  )
}

export default FoldersPage

const FoldersList = ({ folders }) => {
  return (
    <Flex vertical gap={8}>
      {folders?.map((folder) => (
        <HorizontalFolderCard key={folder.id} folder={folder} />
      ))}
    </Flex>
  )
}

const HorizontalFolderCard = ({ folder }) => {
  console.log('HorizontalFolderCard folder', folder.sets)
  return (
    <>
      <Link to={routes.folder({ folderId: folder.id })}>
        <Card
          style={{
            width: '100%',
          }}
          size="small"
          className={styles.hoverable}
        >
          <Flex vertical gap={2}>
            <p>
              {folder.sets.length}
              <> </>
              {folder.sets.length === 1 ? 'set' : 'sets'}
            </p>
            <Flex gap={8} align="center" justify="start">
              <FolderOutlined
                style={{
                  fontSize: '16px',
                }}
              />
              <p>{folder.title}</p>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </>
  )
}

export const HorizontalCardSkeleton = () => {
  return (
    <>
      <Flex vertical gap={8}>
        <Card style={{ backgroundColor: 'transparent' }} size="small" loading />
        <Card style={{ backgroundColor: 'transparent' }} size="small" loading />
      </Flex>
    </>
  )
}
