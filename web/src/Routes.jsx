// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {
  Router,
  Route,
  Private,
  // Set // When layout is needed, this will be used
} from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="home">
        <Route path="/latest" page={LatestPage} name="latest" />
      </Private>
      <Private unauthenticated="home" role="admin">
        <Route path="/admin" page={AdminPage} name="admin" />
      </Private>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={HomePage} />
    </Router>
  )
}

export default Routes
