import { gray } from '@ant-design/colors'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Flex, Image, Skeleton, Space, Tag } from 'antd'

import { Link, routes } from '@redwoodjs/router'

import styles from 'src/Global.module.scss'
import { AVATAR_URL } from 'src/layouts/ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

const CardListOfUser = ({ data, quantity }) => {
  return (
    <>
      {data.length === 0 ? (
        <Empty
          description="No data yet"
          style={{
            marginTop: 24,
            height: 120,
          }}
        />
      ) : (
        <Flex
          align="center"
          justify="start"
          gap={24}
          style={{
            paddingBottom: 24,
            overflowX: 'scroll',
          }}
          className={styles.hideScroll}
          id="cardListOfUser"
        >
          <Button
            style={{
              position: 'absolute',
              left: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
              width: 24,
            }}
            type="text"
            icon={<LeftOutlined />}
            size="large"
            onClick={() => {
              const element = document.getElementById('cardListOfUser')
              element.scrollTo({
                left: element.scrollLeft - 400,
                behavior: 'smooth',
              })
            }}
          />
          {data &&
            data.map((instance) => (
              <TheCard
                key={instance.id}
                instance={instance}
                quantity={quantity}
              />
            ))}
          <Button
            style={{
              position: 'absolute',
              right: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
              width: 24,
            }}
            type="text"
            icon={<RightOutlined />}
            size="large"
            onClick={() => {
              const element = document.getElementById('cardListOfUser')
              element.scrollTo({
                left: element.scrollLeft + 400,
                behavior: 'smooth',
              })
            }}
          />
        </Flex>
      )}
    </>
  )
}

const TheCard = ({ instance, quantity }) => {
  const { user } = instance
  const { userConfig } = user

  return (
    <>
      <Link
        // if instance type in is Set, then link to set page
        // if instance type is Folder, then link to folder page

        to={
          instance.__typename === 'Set'
            ? routes.set({ setId: instance.id })
            : routes.folder({ folderId: instance.id })
        }
      >
        <Card className={styles.hoverable}>
          <Flex
            vertical
            align="start"
            justify="space-between"
            style={{
              width: 400,
              height: 120,
            }}
          >
            <Card.Meta
              title={<div style={{ color: gray[6] }}>{instance.title}</div>}
              description={
                <p
                  style={{
                    wordBreak: 'break-word',
                  }}
                  title={instance.description}
                >
                  {instance.description}
                </p>
              }
            />
            <Flex
              align="center"
              justify="space-between"
              style={{
                width: '100%',
              }}
            >
              <Space>
                <Image
                  src={AVATAR_URL[userConfig?.defaultAvatarIndex]} // TODO: remove
                  width={24}
                  height={24}
                  alt="avatar"
                  preview={false}
                />
                <p
                  style={{
                    color: gray[6],
                    fontSize: 12,
                  }}
                >
                  {user?.username}
                </p>
              </Space>
              <Tag color="geekblue">
                {quantity[0]} {quantity[1]}
              </Tag>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </>
  )
}

export default CardListOfUser

export const CardListSkeleton = ({ asymetric }) => {
  return (
    <>
      <Flex
        gap={24}
        style={{
          paddingBottom: 24,
          overflowX: 'hidden',
        }}
      >
        <Card style={{ backgroundColor: 'transparent' }}>
          <Skeleton style={{ width: 400, height: 120 }} active />
        </Card>
        <Card style={{ backgroundColor: 'transparent' }}>
          <Skeleton style={{ width: 400, height: 120 }} active />
        </Card>
        {!asymetric && (
          <>
            <Card style={{ backgroundColor: 'transparent' }}>
              <Skeleton style={{ width: 400, height: 120 }} active />
            </Card>
          </>
        )}
      </Flex>
    </>
  )
}
