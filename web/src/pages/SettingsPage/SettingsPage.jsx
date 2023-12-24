import { useState } from 'react'

import { blue, gray, red } from '@ant-design/colors'
import {
  PlusOutlined,
  CalendarFilled,
  BulbFilled,
  GlobalOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Space,
  Upload,
  message,
} from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { UPDATE_USER_CONFIG_MUTATION } from 'src/graphql_queries'
import { AVATAR_URL } from 'src/layouts/ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

import styles from '../../Global.module.scss'

const SettingsPage = ({ userId }) => {
  const user = useAuth().currentUser
  const { userConfig } = user
  const [updateUserConfig, { loading, error }] = useMutation(
    UPDATE_USER_CONFIG_MUTATION,
    {
      onCompleted: () => {
        window.location.reload()
      },
    }
  )

  console.log('user', user, 'userConfig', userConfig)

  return (
    <>
      <MetaTags title="Settings" description="Settings page" />
      <Setting
        settingImageSrc={AVATAR_URL[user.userConfig.defaultAvatarIndex]}
        settingImageTitle="Avatar"
        cardTitle="Choose your avatar!"
      >
        <AvatarSetting updateUserConfig={updateUserConfig} user={user} />
      </Setting>
      <Setting
        icon={<CalendarFilled />}
        settingImageTitle="Birthday"
        cardTitle="Choose your birthday!"
      >
        <>
          <p>TODO: choose your birthday</p>
        </>
      </Setting>
      <Setting
        icon={<BulbFilled />}
        settingImageTitle="Theme"
        cardTitle="Choose your theme!"
      >
        <>
          <p>TODO: choose your theme</p>
        </>
      </Setting>
      <Setting
        icon={<GlobalOutlined />}
        settingImageTitle="Language"
        cardTitle="Choose your language!"
      >
        <>
          <p>TODO: choose your language</p>
        </>
      </Setting>
      <Setting
        danger
        icon={<CloseOutlined />}
        settingImageTitle="Delete Account"
        cardTitle="Delete your account!"
      >
        <>
          <p>TODO: delete your account</p>
        </>
      </Setting>
    </>
  )
}

export default SettingsPage

// function Setting(user, updateUserConfig) {
const Setting = ({
  settingImageSrc,
  icon,
  danger,
  settingImageTitle,
  cardTitle,
  children,
}) => {
  return (
    <Flex gap={24} align="center">
      <Flex
        vertical
        gap={16}
        align="center"
        justify="center"
        style={{
          width: '120px',
        }}
      >
        {settingImageSrc && (
          <Image src={settingImageSrc} preview={false} width={80} />
        )}
        {icon && (
          <p
            style={{
              fontSize: '48px',
              color: danger ? red[4] : gray[5],
            }}
          >
            {icon}
          </p>
        )}
        <h2 style={{ color: danger ? red[4] : gray[5], textAlign: 'center' }}>
          {settingImageTitle}
        </h2>
      </Flex>
      <Card
        style={{
          width: '100%',
          minHeight: '200px',
        }}
      >
        <Flex vertical gap={24}>
          <h3
            style={{
              color: gray[5],
            }}
          >
            {cardTitle}
          </h3>
          {children}
        </Flex>
      </Card>
    </Flex>
  )
}
const AvatarSetting = ({ updateUserConfig, user }) => {
  return (
    <>
      <Space wrap="wrap">
        {AVATAR_URL.map((url, index) => (
          <Avatar
            key={index}
            src={url}
            onClick={() => {
              updateUserConfig({
                variables: {
                  id: user.userConfig.id,
                  defaultAvatarIndex: index,
                },
              })
            }}
            style={{
              width: '48px',
              height: '48px',
              cursor: 'pointer',
              border:
                user.userConfig.defaultAvatarIndex === index
                  ? `2px solid ${blue[5]}`
                  : 'none',
            }}
            className={styles.hoverableAvatar}
          />
        ))}
      </Space>
      <Divider style={{ color: gray[0] }}>or</Divider>
      <Flex align="center" justify="center">
        <Upload>
          <Button
            icon={<PlusOutlined />}
            type="dashed"
            title="TODO: upload your own avatar"
            disabled
          >
            Upload your own avatar!
          </Button>
        </Upload>
      </Flex>
    </>
  )
}
