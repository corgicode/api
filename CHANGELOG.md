# NEXT VERSION

## 0.10.2
- Returning projects in user information
- Endpoint to return submissions by user

## 0.10.1
- Fixed typo on package.json

## 0.10.0
- Added email functions to add new subscriber to MC
- Started contributing to changelog again
- Ignoring vscode config files

## 0.91.0

- Added caching to challenge and challenge/:number
- Added cache expirations when adding or updating challenges

## 0.9.1

- Fixed linting error

## 0.9.0

- Lets users add comments to submissions
- Lets visitors see the comments in a submission

## 0.8.1

- Fixed ESLint validation error

## 0.8.0

- Users can now edit their profile
- Made breaking changes to the passport github strategy
- Added the front-end for the users to edit the profile
- Created new angular filter nl2br
- Not returning profile information if profile is private

## 0.7.5

- Fixed og:image property in meta tags

## 0.7.4

- Added google analytics event for newsletter
- Added tere to about page
- Fixed copy on homepage

## 0.7.3

- Fixed looking at someone's profile

## 0.7.2

- Fixed the styling for individual challenge
- Sorting challenges in /challenges by number

## 0.7.1

- Fixed ESLint error

## 0.7.0

- Fixed the submit form styling
- Created new stylesheet: submit
- Added a grunt task to generate jsdoc
  To see the docs, do `cd docs/api && nws`
- Created a new model challenge
- Created a controller for challenges
- Created the start of an admin dash to edit challenges
- Displaying the list of challenges from the database
- Displaying an individual challenge from the database
- Added handlebars library and configuration
- Using grunt to run nodemon and watch inside the docker container
- Ignoring build files from the repo
- Returning the correct version in the responses

## 0.6.1

- Fixed URL in challenge 5

## 0.6.0

- Added a new challenge, 5

## 0.5.0

- Added a new challenge, 4

## 0.4.1 - HOTFIX

- When the user is not logged in, profile/info returns the expected response

## 0.4.0

- Created a config folder that holds constants and initializes the default config for the app
- Always serializing and deserializing session with full user information
- Storing session information in redis
- Users reference submissions using objectId
- Submissions reference _user with objectId
- Fetching the profile using the objectId

## 0.3.0

- Moved from Vagrant to Docker
- The contributing.md file now has instructions for Docker

## 0.2.0

- Added Iva to about us section
- Added a Readme file
- Added a contributing file
- Added tests that verify EsLint

## 0.1.0

- First flow release
- Virtual machine self provisions with all requirements
- User authentication with github
- Can create a submission
- Can create users in mongo
- Basic structure for developer profiles
- Basic structure for challenges
- Build process
- VSCode debug configuration
- Eslint configuration
- Templates basic configuration
- Angular base app, using typescript

