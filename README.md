# blogs-sportz-test

## Technologies Used

- Node.js Express for API building (Run Application on  higher version of Node - V20)
- ReactJs and Bootstrap 5 for Admin and Client applications
- MongoDB to store blog posts


## Overview

- This main directory has three subdirectories
1. Admin : Which is responsible for adding content related to Blogs and Posts
2. Server : This is the API where all the incoming requests are handled
3. Client :  This is user facing UI, where blog posts can be accessed by clients

## Installation

MongoDb Installation (If not installed already):
--------------------
- wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
- echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/- mongodb-org-6.0.list
- sudo apt-get update
- sudo apt-get install -y mongodb-org

MongoDb Start:
---------------
- sudo service mongod start
- sudo systemctl status mongod

Application
------------
1. Clone the repository: `git clone https://github.com/borhademohini/blogs-sportz.git`
2. cd to the directory
3. Install the dependencies in main, client, server and admin directory : `npm install`
4. To Run application:
    - To run API :  `npm run server`
    - To run Client : `npm run client`
    - To run Admin : `npm run admin`

## Future scope (For current implementation):

1. Adding test cases
=> check only published blogs are displayed
=> API responses when listing of posts

2. Adding TinyMCE editor to add a full fledged blog from the Admin

3. While updating the post, handle image magagement as below:
=> if request has new image and no image exists in the DB, Upload image and add it to DB.
=> if request has new image and image already exists in the DB, unlink previous image and add new image to uploads and update DB entry.
=> if request has no image and image already exists in the DB, update all the other data in the DB but image.

4. Add middleware to log system activity
