# shortURL
Third project on [this](https://www.quora.com/What-does-a-good-junior-backend-developer-portfolio-website-look-like/#w5Ttk5Aw21) list and part of my effort to build a better back-end portfolio. A tinyURL clone made in Node.js featuring mongoDB, URL/ID validation, and regular database cleanup.

# Installation
To use this microservice you must have [node.js](https://nodejs.org/en/).

**Setup:**
```
$ git clone https://github.com/jondekerh/shortURL.git
$ cd shortURL
$ npm install
```
In addition to installing dependencies you'll also need MongoDB running locally. For more information on installing MongoDB click [here](https://docs.mongodb.com/manual/installation/#tutorials).

**Running:**
I recommend running your mongo instance in the background using [Linux Screen](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/). The dbpath can be whatever you want it to be, but you'll have to make the directory yourself before running the command. The value after `-S` will be that screen's name for easy re-attachment. I like just using `mongo`.
```
screen -S mongo mongod --dbpath data/db/
node server.js
```
By default it will listen on port 3000. You can change this in `server.js` line 4.

# Features
**Validation:**
When a user submits a URL through the root path a few things happen:
 1. Before anything else, the [dns.lookup](https://nodejs.org/api/dns.html#dns_dns_lookup_hostname_options_callback) function from the `dns` core module is invoked to check the validity of the URL. If this function returns an error the user is sent a response notifying them that their URL is invalid.
 2. If the URL passes the first step of validation it is ran against the validation laid out in the schema found in `data.js`. If it fails here it means that a shortURL leading to this address already exists in the database, and that shortURL will be returned instead of one from a newly saved document.
 3. Custom validation is also done when generating the shortURLs (`_id` in the schema) to make sure there are no collisions there. This too can be found in `data.js`.

**Info endpoint:**
The full Mongo document for any shortURL can be returned by simply adding `/info` after the normal shortURL. For example:
```
http://localhost/4444/info
```
This document contains the shortURL, the address it redirects to, and the timestamp indicating when it was last used. Using this endpoint DOES NOT update the timestamp.

**Automatic database cleanup:**
When a shortURL is used its timestamp will be updated to the current date and time in milliseconds. Every hour a cleanup function will run which checks the database for any documents where this timestamp is more than a week old and deletes them to free up space.

# To Do
- [ ] Clean up this readme.
- [ ] Add proper tests.
