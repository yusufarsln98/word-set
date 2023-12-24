import { useState } from 'react'

import {
  PlusOutlined,
  NotificationOutlined,
  FolderOutlined,
  BlockOutlined,
  FireOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Dropdown,
  Empty,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
  Space,
  message,
  theme,
} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'

import {
  Link,
  navigate,
  routes,
  // get url of page
  useLocation,
} from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { CREATE_FOLDER_MUTATION } from 'src/graphql_queries'

const { Header } = Layout

export const AVATAR_URL = [
  '/avatars/bear.png',
  '/avatars/cat.png',
  '/avatars/chicken.png',
  '/avatars/dog.png',
  '/avatars/giraffe.png',
  '/avatars/gorilla.png',
  '/avatars/koala.png',
  '/avatars/meerkat.png',
  '/avatars/panda.png',
  '/avatars/puffer-fish.png',
  '/avatars/rabbit.png',
  '/avatars/sea-lion.png',
  '/avatars/shark.png',
  '/avatars/sloth.png',
  '/avatars/snake.png',
  '/avatars/walrus.png',
]

const ApplicationLayoutHeader = () => {
  const { pathname } = useLocation()

  const {
    // isAuthenticated,
    currentUser,
    logOut,
  } = useAuth()

  const {
    token: {
      colorBgContainer,
      colorBorder,
      boxShadowTertiary,
      colorBgBase,
      colorBgLayout,
      blue1,
      blue10,
    },
  } = theme.useToken()

  const [openModal, setOpenModal] = useState(false)

  const headerMenuItems = [
    {
      key: '1',
      label: (
        <>
          <Link to={routes.latest()}>Home</Link>
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <>
                      <p>Commming Sooon</p>
                    </>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <>
                      <p>Commming Sooon</p>
                    </>
                  ),
                },
              ],
            }}
            placement="bottomLeft"
            overlayStyle={{ minWidth: '160px' }}
          >
            <Space>
              Your Library
              <DownOutlined />
            </Space>
          </Dropdown>
        </>
      ),
    },
  ]

  const addDropdownMenuItems = [
    {
      key: 'createFolder',
      label: (
        <Flex align="center" justify="start" gap={16}>
          <FolderOutlined />
          <Paragraph style={{ margin: 0, fontSize: '1rem' }}>
            Add Folder
          </Paragraph>
        </Flex>
      ),
    },
    {
      key: 'createSet',
      label: (
        <Flex align="center" justify="start" gap={16}>
          <BlockOutlined />
          <Paragraph style={{ margin: 0, fontSize: '1rem' }}>Add Set</Paragraph>
        </Flex>
      ),
    },
  ]

  const notificationDropdownMenuItems = [
    {
      key: '1',
      label: (
        <>
          <>
            <Empty description="No notifications" />
          </>
        </>
      ),
    },
  ]

  const userDropdownMenuItems = [
    {
      key: '1',
      disabled: true,
      label: (
        <>
          <Flex
            align="center"
            justify="start"
            gap={16}
            style={{ width: '100%', cursor: 'default' }}
          >
            <Avatar
              src={AVATAR_URL[currentUser?.userConfig.defaultAvatarIndex ?? 0]}
              draggable={false}
              size="large"
            />
            <Flex vertical gap={0}>
              <Paragraph style={{ margin: 0 }}>{currentUser?.name}</Paragraph>
            </Flex>
          </Flex>
        </>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <>
          <Link to={routes.profile({ userId: currentUser?.id })}>
            <Flex align="center" justify="start" gap={16}>
              <UserOutlined />
              <Paragraph
                style={{
                  margin: 0,
                  fontSize: '1rem',
                }}
              >
                Profile
              </Paragraph>
            </Flex>
          </Link>
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <Link to={routes.settings({ userId: currentUser?.id })}>
            <Flex align="center" justify="start" gap={16}>
              <SettingOutlined />
              <Paragraph
                style={{
                  margin: 0,
                  fontSize: '1rem',
                }}
              >
                Settings
              </Paragraph>
            </Flex>
          </Link>
        </>
      ),
    },
    {
      key: '4',
      label: (
        <>
          <Flex align="center" justify="start" gap={16}>
            <FireOutlined />
            <Paragraph
              style={{
                margin: 0,
                fontSize: '1rem',
              }}
            >
              Switch Theme
            </Paragraph>
          </Flex>
        </>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <>
          <Flex
            align="center"
            justify="start"
            gap={16}
            onClick={() => {
              logOut()
            }}
          >
            <LogoutOutlined />
            <Paragraph
              style={{
                margin: 0,
                fontSize: '1rem',
              }}
            >
              Log Out
            </Paragraph>
          </Flex>
        </>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '6',
      label: (
        <>
          <Flex align="center" justify="start" gap={16}>
            <Paragraph
              style={{
                margin: '0',
                marginLeft: '10px',
                fontSize: '1rem',
              }}
            >
              Help
            </Paragraph>
          </Flex>
        </>
      ),
    },
    {
      key: '7',
      label: (
        <>
          <Flex align="center" justify="start" gap={16}>
            <Paragraph
              style={{
                margin: 0,
                marginLeft: '10px',
                fontSize: '1rem',
              }}
            >
              Upgrade
            </Paragraph>
          </Flex>
        </>
      ),
    },
  ]

  // get create folder mutation
  const [createFolder, { _loading }] = useMutation(CREATE_FOLDER_MUTATION) // loading can be used for other scenarios, but not for this one

  const onFinishCreateFolder = (values) => {
    console.log('Success:', values)
    createFolder({
      variables: {
        title: values.folderName,
        description: values.description,
        userId: currentUser?.id,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setOpenModal(false)
      })
  }
  return (
    <>
      <Header
        style={{
          background: colorBgContainer,
          userSelect: 'none',
          borderBottom: `1px solid ${colorBorder}`,
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex // logo and menu
            justify="flex-start"
            align="center"
          >
            <Link
              to={routes.latest()} // later can be changed with routes.latest()
            >
              <Image src="/logo/Logo-Text.svg" preview={false} width="120px" />
            </Link>
            <Menu
              mode="horizontal"
              selectedKeys={pathname === '/latest' ? ['1'] : null}
              items={headerMenuItems}
              style={{
                background: colorBgContainer,
                borderBottom: `1px solid ${colorBorder}`,
                width: '480px',
              }}
            />
          </Flex>
          <Space size={'large'}>
            <Dropdown // add button
              trigger={['click']}
              menu={{
                items: addDropdownMenuItems,
                onClick: (e) => {
                  e.key == 'createFolder' && setOpenModal(true)
                  e.key == 'createSet' && navigate(routes.createSet())
                },
              }}
              // set some margin
              overlayStyle={{ minWidth: '160px' }}
              placement="bottomRight"
            >
              <ButtonWithIcon
                icon={<PlusOutlined />}
                type="primary"
                shape="circle"
              />
            </Dropdown>
            <Dropdown // notification button
              trigger={['click']}
              menu={{
                items: notificationDropdownMenuItems,
              }}
              placement="bottomRight"
              overlayStyle={{ minWidth: '320px' }}
            >
              <ButtonWithIcon icon={<NotificationOutlined />} shape="circle" />
            </Dropdown>

            <Dropdown // user button
              trigger={['click']}
              // set offset
              menu={{
                items: userDropdownMenuItems,
              }}
              placement="bottomRight"
              overlayStyle={{ minWidth: '160px' }}
            >
              <ButtonWithIcon
                icon={
                  <Avatar
                    src={
                      AVATAR_URL[
                        currentUser?.userConfig.defaultAvatarIndex ?? 0
                      ]
                    }
                    draggable={false}
                    size="large"
                  />
                }
                shape="circle"
              />
            </Dropdown>
          </Space>
        </Flex>
      </Header>
      <Modal
        open={openModal}
        title="Create a new folder"
        footer={null}
        // onOk={() => {
        //   setOpenModal(false)
        // }}
        onCancel={() => {
          setOpenModal(false)
        }}
      >
        <Form
          layout="vertical"
          name="getFolder"
          style={{ width: '100%', marginTop: '16px' }}
          onFinish={(values) => {
            onFinishCreateFolder(values)
          }}
        >
          <Form.Item
            label="Folder Name"
            name="folderName"
            rules={[
              {
                max: 20,
                message: 'Name should be less than 20 characters!',
              },
              {
                min: 5,
                message: 'Name should be more than 5 characters!',
              },
            ]}
          >
            <Input
              style={{
                background: colorBgLayout,
                borderBottom: `1px solid ${blue10}`,
              }}
              placeholder="Enter a name for your folder..."
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                max: 100,
                message: 'Description should be less than 100 characters!',
              },
              {
                min: 10,
                message: 'Description should be more than 10 characters!',
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 3 }}
              style={{
                background: colorBgLayout,
                borderBottom: `1px solid ${blue10}`,
              }}
              placeholder="Enter a description for your folder..."
            />
          </Form.Item>
          <Flex
            align="center"
            justify="end"
            gap={8}
            style={{ marginTop: '16px' }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default ApplicationLayoutHeader

const ButtonWithIcon = (
  // take icon as a prop
  { icon, type, shape, ...rest }
) => {
  return (
    <Button
      icon={icon}
      type={type}
      // circle
      shape={shape}
      size="large"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...rest}
    />
  )
}
