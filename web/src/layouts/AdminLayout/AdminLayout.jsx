import React from 'react'

// import { HappyProvider } from '@ant-design/happy-work-theme'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  // MenuFoldOutlined,
  // MenuUnfoldOutlined,
  // PieChartOutlined,
  BookOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Flex,
  Image,
  Layout,
  Menu,
  theme,
  // theme,
} from 'antd'
// import useToken from 'antd/es/theme/useToken'

import { Content, Footer } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import { Link, routes, useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
const items = [
  getItem('Dictionaries', '1', <BookOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ]),
]

const { Header } = Layout

const AdminLayout = ({ children }) => {
  // get
  const { pathname } = useLocation()
  const { logOut } = useAuth()

  console.log(pathname)
  const {
    token: { colorBgContainer, borderRadiusLG, colorBorder, boxShadowTertiary },
  } = theme.useToken()

  return (
    <>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to={routes.admin()}>
            <Image
              src="/logo/Logo-Horizontal.svg"
              height={60}
              preview={false}
              draggable={false}
            />
          </Link>
          <Button
            type="text"
            onClick={logOut}
            icon={
              <LogoutOutlined
                style={{
                  color: colorBorder,
                }}
              />
            }
          />
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to={routes.admin()}>Admin</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: '24px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={240}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                // inlineCollapsed={collapsed}
                style={{ height: '100%' }}
                items={items}
              />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 'calc(100vh - 240px)',
              }}
            >
              {children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Word Set ©2023 Created by yusufarsln98
        </Footer>
      </Layout>
    </>
  )
}
export default AdminLayout
