[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# File storage CRUD Application with Node and React

File storage implementation in MySOL database with server side encryption. The application is implemented in React as a client and Node.js (Express) as a server. The application allows you to upload, download and delete files from the database. Supported file types for uploading and downloading: 7z, zip, gif, epub, docx, mp3, pdf, xlsx, jpg, txt, fb2, png, wav and others.

## Getting Started
These instructions will provide you with a copy of the project that will be launched on your local computer for development and testing.

## Prerequisites
What things you need to install the software.

- Git.
- NPM.
- XAMPP (or another local mysql server).
- IDE (or code editor)


## Install
Clone the git repository on your computer
```
$ git clone https://github.com/alavir-ua/filestorage
```
You can also download the entire repository as a zip file and unpack in on your computer if you do not have git

After cloning the application, you need to install it's dependencies.
```
$ npm install && cd client && npm install
```

## Set environment keys
When you finish the installation, rename the .env.example file in the root directory of your project to .env and fill it with the variables of your local development environment.

## MySQL database recovery 
To restore the local MySQL database, you can run the command in the terminal:
```
$ npm run seeder
```

## Run the application
```
$ npm run start
```
After that, open the browser at http://localhost:3000 to view the result.

The authentication and authorization system can be tested with the following access data:
```
 admin@email.com       11111A
 [randomly generated]  11111U
```

The size of the downloaded files is limited by your database configuration.
## Links
[Live Demo](https://react-filestorage.herokuapp.com/)
