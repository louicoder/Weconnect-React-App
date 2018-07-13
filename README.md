
[![Build Status](https://travis-ci.org/louiCoder/Weconnect-React-App.svg?branch=develop)](https://travis-ci.org/louiCoder/Weconnect-React-App)
[![Coverage Status](https://coveralls.io/repos/github/louiCoder/react-app-example/badge.svg?branch=develop)](https://coveralls.io/github/louiCoder/react-app-example?branch=develop)
# WE-CONNECT REACT APPLICATION

## About
This is a ReactJS Application, created using Facebook's create-react-app. The App consumes the  We-connect python/flask API developed previously.

## Instructions on setting up locally
- Clone this repository
```
git clone https://github.com/louiCoder/Weconnect-React-App.git
```
- Intall Required Packages
Make sure you have npm installed on your machine
```
$ npm install
```
- Run the application
```
$ npm run start
```


## Run Tests
- To run all the tests normally
```
$ npm test
```
 - Run tests with Coverage
```
$ npm test -- --coverage
```

## Guidelines on navigation first time users
- Register with a new account on the registration this can be accessed by adding `/register` to the url. Fields below are mandatory.
```
username, email and password
```
- Log into the application by entering your username and password accessed by adding route below to the url
```
/login
```

## Other important links.

| ROUTE | DESCRIPTION | 
| ------- | ----- | 
| /register | New user registration | 
| /login | User login | 
| /business | New business registration | 
| /allbusinesses | All registered businesses | 
| /mybusinesses | User's owned businesses | 
| /search | Searching businesses | 
| /profile | User's profile and User's reset password section | 
