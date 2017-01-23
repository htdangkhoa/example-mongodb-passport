# Example MongoDB And Passport
### Description

Example source for MongoDB, NodeJS, Express and Passport.

### Structure of project
```
|- models/
|----- user.js
|- passport/
|----- index.js
|- routes/
|----- api.js
|- views/
|----- home.html
|----- login.html
|----- profile.html
|----- signup.html
|- app.js
|- config.js
|- package.json
```

### Document for modules
  - [Mongoose](http://mongoosejs.com/docs/2.7.x/index.html).
  - [Passport](http://passportjs.org/docs).
  - [Bcrypt](https://www.npmjs.com/package/bcrypt).
  - [EJS](http://www.embeddedjs.com/).

### Installation

Project requires:  
  - [Node.js](https://nodejs.org/) v4+ to run.
  - [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)

Configure MongoDB: After installing MongoDB, we start creating database.
```sh
$ sudo service mongod start
$ mongodb
> use [database_name]
```

### Install the dependencies.

```sh
$ npm install
```

### Getting Started
```sh
$ node app.js
```
