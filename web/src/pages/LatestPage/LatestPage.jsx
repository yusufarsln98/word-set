import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

// import { useAuth } from 'src/auth'

const LatestPage = () => {
  // const {
  // isAuthenticated,
  // currentUser,
  // logOut,
  // } = useAuth()

  return (
    <>
      <MetaTags title="Latest" description="Latest page" />

      <h1>LatestPage</h1>
      <p>
        Find me in <code>./web/src/pages/LatestPage/LatestPage.jsx</code>
        <Link to={routes.latest()}>Latest</Link>`
      </p>
    </>
  )
}

export default LatestPage
