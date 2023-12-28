import { useEffect } from 'react'

import { gray } from '@ant-design/colors'
import { Avatar, Flex, Tabs, theme } from 'antd'

import { Link, routes, navigate, useLocation } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { AVATAR_URL } from '../ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

export const PROFILE_USER_QUERY = gql`
  query ProfileUserQuery($id: Int!) {
    user(id: $id) {
      id
      name
      username
      email
      createdAt
      userConfig {
        id
        defaultAvatarIndex
        birthday
        languageNative
        languageLearning
        theme
      }
    }
  }
`

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
  // get user id from url
  const userId = parseInt(useLocation().pathname.split('/')[2])
  const { currentUser } = useAuth()

  const { data, loading, error } = useQuery(PROFILE_USER_QUERY, {
    variables: { id: userId },
  })

  const { user: user } = data || {}
  const { userConfig } = user || {}

  const {
    token: { colorBorder },
  } = theme.useToken()

  const items = [
    {
      key: 'recent-activities',
      label: (
        <>
          <Link to={routes.profile({ userId: user?.id ?? 0 })}>
            Recent Activities
          </Link>
        </>
      ),
    },
    {
      key: 'folders',
      label: (
        <>
          <Link to={routes.folders({ userId: user?.id ?? 0 })}>Folders</Link>
        </>
      ),
    },
    {
      key: 'sets',
      label: (
        <>
          <Link to={routes.sets({ userId: user?.id ?? 0 })}>Sets</Link>
        </>
      ),
    },
    {
      key: 'settings',
      label: (
        <>
          <Link to={routes.settings({ userId: user?.id ?? 0 })}>Settings</Link>
        </>
      ),
    },
  ]
  const currentTab = useLocation().pathname.split('/')[3] || 'recent-activities'

  useEffect(() => {
    if (user && currentUser && user.id !== currentUser.id) {
      navigate(routes.home())
    }
  }, [user, currentUser])

  return (
    <>
      <Flex
        vertical
        style={{
          padding: '32px 16px',
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
            <h2 style={{ color: gray[7] }}>{user?.username}</h2>
            <p style={{ color: gray[2] }}>{user?.name}</p>
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
