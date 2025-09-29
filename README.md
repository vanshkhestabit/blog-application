# NEXT.JS Project
# Made By - Vansh

This is a basic blog posting application, where user can post his blog with title and content.
This Application has CRUD operations for the blogs.

# using tailwindCss, ShadCN Components to enhance the speed of the developement.

# Considering the folder structure -

Components - All The Components Used For The Frontend UI.
Config - Config of our project, i.e DB Connection.
Context - Contains Global Context Data for User and Post.
Hooks - useFetch custom hook for loading state management in forms.
Lib - Lib functions used in contacting through API and shadcn.
Models - Model blueprint for User and Post.
Schema - Checking the schema of the data sending from frontend to backend, Forms and Post
Util - Utility Functions such as creating AccessTokens.

middleware.js - Contains the middleware function that checks jwt token.

.env.local - Env file for local development.