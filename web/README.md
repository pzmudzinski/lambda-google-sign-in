# Lambda Google Sign In

Sample code for `AWS Lambda` secured with Google authentication + email domain check together with front end part implemented in React.

## Setup

You need to setup those env vars for running lambdas:

- `GOOGLE_CLIENT_ID` (you can create it in google developers console)
- `COMPANY_DOMAIN` (expected email domain user should log in into the website)

Also you need to have [serverless](`https://www.serverless.com`) installed.

## Running the app

### Lambdas

`cd lambdas && sls offline`

### Client

`npm install && npm start`
