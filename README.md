## Bottoms Up! API

This is the backend for Bottoms Up!. A live version of this app can be found at:  https://bottoms-up-client.kelleymb.vercel.app/

The front end client can be found at: https://github.com/kelleymb/bottoms-up-client

### Introduction to Bottoms Up!

Since COVID hit the US, so much has changed in our routines. With quarantines and social distancing, things have never been so glum!

But fear not, Bottoms Up! is here to help you quarantine in style, whether it's a virtual happy hour or a weekend at home, we've got you covered.

Be your own bartender, search through various Vodka, Gin, Scotch, Tequila, and Rum recipes and even post your own creations!

### API Overview

<pre>
<code>
/api
.
|
|___ /GET
|     |--- /collections
|
|
|____ /POST
|       |--- /postrecipe
|
|
|
</code>
</pre>

<p>GET /collections</p>

<pre>
<code>
//req.query
{
  ?main_liquor=main_liquor
}

//res.body
{
  id: Number,
  drink_name: String,
  main_liquor: String,
  ingredients: String,
  instructions: String,
  created: Date
}

//HTTP Status Code: 200 OK

</code>
</pre>

<p>POST /postrecipe</p>

<pre>
<code>
//req.body
{
  drink_name: String,
  main_liquor: String,
  ingredients: String,
  instructions: String,
}

//res.body
{
  id: Number,
  drink_name: String,
  main_liquor: String,
  ingredients: String,
  instructions: String,
  created: Date
}

//HTTP Status Code: 201 CREATED

</code>
</pre>

### Application Demo

![](/images/About.png)
![](/images/Cocktail.png)
![](/images/Collections.png)
![](/images/LocalBrewery.png)
![](/images/Post.png)

## Technology

### Back End
- Node and Express
  - RESTful API
  
### Database
- Postgres
- Knex.js, SQL Query Builder
- Postgrator CLI

### Testing
- Mocha
- Chai
- Supertest

### Production
- Deployed via Heroku

## Set up
* Postgres and Node are the major dependencies for this repo.

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of "btr-api",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Create the dev and test databases `createdb -U postgres -d born-to-read` and `createdb -U postgres -d born-to-read-test`

Run migrations for dev database `npm run migrate`

Run migrations for test database `npm run migrate:test`

Run migrations for production `npm run migrate:production`

Run predeploy `npm run predeploy`

Run deploy `npm run deploy`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
