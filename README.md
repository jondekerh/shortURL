# shortURL
Third project on [this](https://www.quora.com/What-does-a-good-junior-backend-developer-portfolio-website-look-like/#w5Ttk5Aw21) list and part of my effort to build a better back-end portfolio. A tinyURL clone made in Node.js featuring mongoDB, url/id validation, and regular database cleanup.

# Installation
You must have [node.js](https://nodejs.org/en/) and [mongoDB](https://docs.mongodb.com/manual/installation/#tutorials) installed locally for this to run.

**Setup:**<br/>
```
$ git clone https://github.com/jondekerh/shortURL.git
$ cd shortURL
$ npm install
```

**Running:**<br/>
I recommend running your mongo instance in the background using [Linux Screen](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/). The dbpath can be whatever you want it to be, but you'll have to make the directory yourself before running the command. The value after `-S` will be that screen's name for easy re-attachment. I like just using `mongo`.
```
screen -S mongo mongod --dbpath data/db/
node server.js
```
By default it will listen on port 3000. You can change this in `server.js` line 4.

# Features
**Validation:**<br/>
The schema found in `data.js` contains mongoose validation for the `_id` and `url` keys. The `_id` field is where the unique ids for the shortened urls are stored. The value in this field is checked against all existing documents before saving to ensure there are no collisions.

The `url` field is where the redirect address is stored. When a user submits a url through the root endpoint it is checked against all existing documents. If it is already in the database a new document will not be saved and values from the existing document will be included in the response instead.

**Info endpoint:**<br/>
The full document for any shortened url can be returned by simply adding `/info` after the normal url. For example:
```
http://localhost/4444/info
```
This document contains the unique id, the address it redirects to, and the timestamp indicating when it was last used. Using this endpoint does not update the timestamp.

**Automatic database cleanup:**<br/>
When a shortened url is used its timestamp will be updated to the current date and time in milliseconds. Every hour a cleanup function runs which checks the database for any documents where this timestamp is more than a week old and deletes them to free up space.

# To Do
- [ ] Add proper tests.
