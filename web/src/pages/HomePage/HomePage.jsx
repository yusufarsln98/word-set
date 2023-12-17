import { useEffect } from 'react'

import { Button } from 'antd'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.latest())
    } else {
      navigate(routes.login())
    }
  }, [isAuthenticated])

  return (
    <>
      {!isAuthenticated && (
        <>
          <MetaTags title="Home" description="Home page" />
          <h1>HomePage</h1>
        </>
      )}
    </>
  )
}

export default HomePage
