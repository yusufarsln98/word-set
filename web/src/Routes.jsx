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
  PrivateSet,
  // Set // When layout is needed, this will be used
} from '@redwoodjs/router'

import { useAuth } from './auth'
import ApplicationLayout from './layouts/ApplicationLayout/ApplicationLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <PrivateSet unauthenticated="home" wrap={ApplicationLayout}>
        <Route path="/latest" page={LatestPage} name="latest" />
      </PrivateSet>

      <PrivateSet unauthenticated="home" roles="ADMIN">
        <Route path="/admin" page={AdminPage} name="admin" />
      </PrivateSet>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
