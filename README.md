#Angular Express Seed With Authentication

This project is a great starting point for developers
who want to use Angular and Express in the same repository
as well as have Angular handle ALL of the front end work, with Express
delivering just the initial index.html file.

#####How It Works

1.  Node handles the GET request for the default route http://www.mywebsite.com/
  *  Sends the main Angular HTML file to the browser
2.  All subsequent GET requests for views are handled by Angular routes ($routeProvider)
3.  You'll define all of your CRUD operation routes in your express application (routes.js)
4.  User account creation and login are built-in using passport
  *  Login at `/login`
  *  Create a new user account at `/signup`
5.  Ensure that you use the middleware function `isAuthenticated` for each of your new routes on any request that must first have an authenticated user
  *  Data that you want made to the public (without a user first loggin in) can omit the `isAuthenticated` middleware 
