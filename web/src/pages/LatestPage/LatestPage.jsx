import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const LatestPage = () => {
  const {
    // isAuthenticated,
    currentUser,
    logOut,
  } = useAuth()

  return (
    <>
      <MetaTags title="Latest" description="Latest page" />

      <h1>LatestPage</h1>
      <p>
        Find me in <code>./web/src/pages/LatestPage/LatestPage.jsx</code>
      </p>
      <p>
        My default route is named <code>latest</code>, link to me with `
        <Link to={routes.latest()}>Latest</Link>`
      </p>
      <>
        {/* logout */}
        <button onClick={logOut}>Log Out</button>
        {/* user info */}
      </>
    </>
  )
}

export default LatestPage
