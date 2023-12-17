import {
  //
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  Menu,
  Space,
  theme,
} from 'antd'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const { Header, Content, Footer } = Layout

const ApplicationLayout = ({ children }) => {
  const {
    // isAuthenticated,
    // currentUser,
    logOut,
  } = useAuth()

  const {
    token: { colorBgContainer, colorBgLayout, colorBorder, boxShadowTertiary },
  } = theme.useToken()

  const headerMenuItems = [
    {
      key: '1',
      label: (
        <>
          <Link to={routes.latest()}>Latest</Link>
        </>
      ),
    },
    {
      key: '2',
      label: 'nav 2',
    },
    {
      key: '3',
      label: 'nav 3',
    },
  ]

  const addDropdownMenuItems = [
    {
      key: '1',
      label: <>1st menu item</>,
    },
    {
      key: '2',
      label: <>2nd menu item</>,
    },
    {
      key: '3',
      label: <>3rd menu item</>,
    },
  ]

  const notificationDropdownMenuItems = [
    {
      key: '1',
      label: <>1st menu item</>,
    },
    {
      key: '2',
      label: <>2nd menu item</>,
    },
    {
      key: '3',
      label: <>3rd menu item</>,
    },
  ]

  const userDropdownMenuItems = [
    {
      key: '1',
      label: <>1st menu item</>,
    },
    {
      key: '2',
      label: <>2nd menu item</>,
    },
    {
      key: '3',
      label: (
        <>
          <Button onClick={logOut}>Log Out</Button>
        </>
      ),
    },
  ]

  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            background: colorBgContainer,
            userSelect: 'none',
            borderBottom: `1px solid ${colorBorder}`,
            boxShadow: boxShadowTertiary,
          }}
        >
          <Flex justify="space-between" align="center">
            <Flex justify="flex-start" align="center">
              <Link
                to={routes.home()} // later can be changed with routes.latest()
              >
                <Image
                  src="/logo/Logo-Text.svg"
                  preview={false}
                  width="120px"
                />
              </Link>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={headerMenuItems}
                style={{
                  background: colorBgContainer,
                  borderBottom: `1px solid ${colorBorder}`,
                }}
              />
              {/* <Search
                // type="search"
                placeholder="Search"
                onSearch={(value) => alert(value)}
              /> */}
            </Flex>
            <Space>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: addDropdownMenuItems,
                }}
                placement="bottomLeft"
              >
                <Button>Add</Button>
              </Dropdown>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: notificationDropdownMenuItems,
                }}
                placement="bottomLeft"
              >
                <Button
                  style={{
                    background: colorBgLayout,
                  }}
                >
                  Notification
                </Button>
              </Dropdown>

              <Dropdown
                trigger={['click']}
                menu={{
                  items: userDropdownMenuItems,
                }}
                placement="bottomLeft"
              >
                <Button
                  style={{
                    background: colorBgLayout,
                  }}
                >
                  User Icon
                </Button>
              </Dropdown>
            </Space>
          </Flex>
        </Header>

        <Content
          style={{
            minHeight: 'calc(100vh - 64px)', // 64px is the height of the header
            padding: '0 50px', // 0 for top and bottom, 50px for left and right
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            borderTop: `1px solid ${colorBorder}`,
            background: colorBgContainer,
          }}
        >
          <Flex justify="center" align="center">
            WordSet © 2023
          </Flex>
        </Footer>
      </Layout>
    </>
  )
}

export default ApplicationLayout
