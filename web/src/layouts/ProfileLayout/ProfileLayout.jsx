import { gray } from '@ant-design/colors'
import { Avatar, Flex, Tabs, theme } from 'antd'

import { Link, routes, navigate, useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { AVATAR_URL } from '../ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

const onChange = (key) => {
  switch (key) {
    case 'profile':
      navigate(routes.profile())
      break
    case 'folders':
      break
    case 'sets':
      break
    case 'settings':
      break
    default:
      break
  }
}

const ProfileLayout = ({ children }) => {
  const { currentUser } = useAuth()
  const { userConfig } = currentUser
  const {
    token: { colorBorder },
  } = theme.useToken()

  const items = [
    {
      key: 'recent-activities',
      label: (
        <>
          <Link to={routes.profile({ userId: currentUser.id })}>
            Recent Activities
          </Link>
        </>
      ),
    },
    {
      key: 'folders',
      label: (
        <>
          <Link to={routes.folders({ userId: currentUser.id })}>Folders</Link>
        </>
      ),
    },
    {
      key: 'sets',
      label: (
        <>
          <Link to={routes.sets({ userId: currentUser.id })}>Sets</Link>
        </>
      ),
    },
    {
      key: 'settings',
      label: (
        <>
          <Link to={routes.settings({ userId: currentUser.id })}>Settings</Link>
        </>
      ),
    },
  ]
  const currentTab = useLocation().pathname.split('/')[3] || 'recent-activities'

  return (
    <>
      <Flex
        vertical
        style={{
          padding: '16px',
          paddingTop: '32px',
          width: '1200px',
        }}
        gap={32}
      >
        <Flex style={{ width: '100%' }} gap={16} align="center" justify="start">
          <Avatar
            src={AVATAR_URL[userConfig?.defaultAvatarIndex]}
            alt="avatar"
            style={{
              width: '64px',
              height: '64px',
            }}
            draggable={false}
          />
          <Flex vertical gap={4}>
            <h2 style={{ color: gray[7] }}>{currentUser?.username}</h2>
            <p style={{ color: gray[2] }}>{currentUser?.name}</p>
          </Flex>
        </Flex>

        <Tabs
          items={items}
          onChange={onChange}
          style={{ width: '100%' }}
          tabBarStyle={{
            borderBottom: `1px solid ${colorBorder}`,
          }}
          activeKey={currentTab}
        />
        {children}
      </Flex>
    </>
  )
}

export default ProfileLayout
