import { volcano } from '@ant-design/colors'
import { FireFilled } from '@ant-design/icons'
import { Calendar, Flex } from 'antd'
import Card from 'antd/es/card/Card'

// import icons from ant
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

import { USER_QUERY_ACTIVITY } from 'src/graphql'

const ProfilePage = ({ userId }) => {
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery(USER_QUERY_ACTIVITY, {
    variables: { userId },
  })
  const { daysStudied } = userData?.user || []

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <Flex
        align="start"
        vertical
        style={{
          height: '100%',
          width: 'calc(1200px - 32px)', // 32 = padding * 2 in ProfileLayout
        }}
        gap={16}
      >
        <h3>Recent Activity</h3>
        <Card>
          <Flex gap={40}>
            <Flex
              vertical
              align="center"
              justify="center"
              style={{
                width: '200px',
              }}
            >
              <FireFilled
                style={{
                  color: volcano[5],
                  fontSize: '80px',
                }}
              />
            </Flex>
            <Calendar
              style={{
                width: '720px',
                padding: '0 32px',
                background: 'white',
              }}
              fullscreen={false}
              fullCellRender={(date) => {
                return (
                  <>
                    {/* if date in current month */}
                    {date.month() === new Date().getMonth() && (
                      <div>
                        {daysStudied?.includes(date.format('YYYY-MM-DD')) && (
                          <FireFilled
                            style={{
                              color: volcano[5],
                              fontSize: '24px',
                            }}
                          />
                        )}
                        {date.date()}
                      </div>
                    )}
                  </>
                )
              }}
              mode="month"
              headerRender={() => {
                return (
                  <Flex
                    style={{
                      marginBottom: '16px',
                    }}
                  >
                    <h3>{today}</h3>
                  </Flex>
                )
              }}
            />
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default ProfilePage
