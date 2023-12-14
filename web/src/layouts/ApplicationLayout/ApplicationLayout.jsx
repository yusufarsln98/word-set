import { Button, Dropdown, Flex, Image, Layout, Menu, Space, theme } from 'antd'

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
    token: { colorBgContainer, colorBgLayout, colorBorder },
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
                defaultSelectedKeys={['2']}
                items={headerMenuItems}
                style={{
                  background: colorBgContainer,
                  borderBottom: `1px solid ${colorBorder}`,
                }}
              />
              {/* <Input
                type="search"
                placeholder="Search"
                style={{
                  background: colorBgLayout,
                }}
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
                  onClick={console.log('Notification Clicked!')}
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
                  onClick={console.log('User Icon Clicked!')}
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
            padding: '0 50px',
            background: colorBgContainer,
          }}
        >
          <div className="site-layout-content">{children}</div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: colorBgLayout,
            borderTop: `1px solid ${colorBorder}`,
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
