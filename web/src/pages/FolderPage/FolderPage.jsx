import { gray } from '@ant-design/colors'
import { PlusOutlined, ShareAltOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Space, message } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { FOLDER_QUERY } from 'src/graphql'
import { AVATAR_URL } from 'src/layouts/ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

const FolderPage = ({ folderId }) => {
  const { currentUser } = useAuth()
  const {
    data: folderData,
    loading,
    error,
  } = useQuery(FOLDER_QUERY, {
    variables: { id: folderId },
  })
  const folder = folderData?.folder

  console.log('folderData', folderData)

  return (
    <>
      <MetaTags title="Folder" description="Folder page" />
      <Flex style={{ color: gray[6] }} align="center" justify="start" gap={48}>
        <p style={{ minWidth: 40 }}>
          {folder?.sets.length}
          <> </>
          {folder?.sets.length === 1 ? 'set' : 'sets'}
        </p>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Flex align="center" gap={16}>
            <p>created by </p>
            <Avatar
              src={AVATAR_URL[folder?.user.userConfig.defaultAvatarIndex]}
            />
            <Link to={routes.profile({ userId: parseInt(folder?.user.id) })}>
              <p
                style={{
                  color: gray[6],
                  fontWeight: 'bold',
                }}
              >
                {folder?.user.username}
              </p>
            </Link>
          </Flex>
          <Space>
            <ButtonWithIcon
              size="large"
              shape="circle"
              icon={<PlusOutlined />}
            />
            <ButtonWithIcon
              size="large"
              shape="circle"
              icon={<ShareAltOutlined />}
            />
            <ButtonWithIcon
              size="large"
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Space>
        </Flex>
      </Flex>
    </>
  )
}

export default FolderPage

const ButtonWithIcon = ({ icon, children, ...props }) => {
  return (
    <Button
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Space>
        {icon}
        {children}
      </Space>
    </Button>
  )
}
