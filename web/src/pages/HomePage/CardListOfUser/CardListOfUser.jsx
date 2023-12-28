import { gray } from '@ant-design/colors'
import { Card, Empty, Flex, Image, Skeleton, Space, Tag } from 'antd'

import { Link, routes } from '@redwoodjs/router'

import styles from 'src/Global.module.scss'
import { AVATAR_URL } from 'src/layouts/ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

const CardListOfUser = ({ data, user }) => {
  // drag and slide the filters
  const [dragging, setDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)
  const [disabled, setDisabled] = React.useState(false)
  const onMouseDown = (event) => {
    setDragging(true)
    setDisabled(true)
    setStartX(event.pageX - event.currentTarget.offsetLeft)
    setScrollLeft(event.currentTarget.scrollLeft)
  }

  const onMouseUp = (event) => {
    setDragging(false)
    // if offset is 0, then disable is true
    const offset = event.currentTarget.scrollLeft - scrollLeft
    if (offset === 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const onMouseMove = (event) => {
    if (!dragging) return
    event.preventDefault()
    const x = event.pageX - event.currentTarget.offsetLeft
    const walk = x - startX //scroll-fast
    event.currentTarget.scrollLeft = scrollLeft - walk
  }

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
            // disable text selection
            userSelect: 'none',
          }}
          className={styles.hideScroll}
          id="cardListOfUser"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {data &&
            data.map((instance) => (
              <TheCard
                key={instance.id}
                disabled={disabled}
                instance={instance}
                user={user}
              >
                {instance.__typename === 'Set' && (
                  <Tag color="geekblue">{instance.flashCards.length} cards</Tag>
                )}
                {instance.__typename === 'Folder' && (
                  <Tag color="geekblue">{instance.sets.length} sets</Tag>
                )}
              </TheCard>
            ))}
        </Flex>
      )}
    </>
  )
}

const TheCard = ({ disabled, instance, user, children }) => {
  return (
    <>
      <Link
        to={
          !disabled
            ? instance.__typename === 'Set'
              ? routes.set({ setId: instance.id })
              : routes.folder({ folderId: instance.id })
            : null
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
                  src={AVATAR_URL[user?.userConfig?.defaultAvatarIndex]} // TODO: remove
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
              {children}
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
