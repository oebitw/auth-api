# auth-api

## Author: Omar Ewies
* [Tests Report](https://github.com/oebitw/auth-api/actions)

* [Heroku Deployment](https://oebitw-auth-api.herokuapp.com/)

* [Pull Request](https://github.com/oebitw/auth-api/pull/1)

## Setup

1) Clone the repo
2) npm init -y.
3) npm install.
4) Create .env file with PORT=3030.

## Test
* npm test

## Run the app
* npm start

## End points

### `/signup`: POST Method

[]()

* You can Sign-up by sending post request using postman.

You can signup as:
1) user
2) writer
3) editor
4) admin

Example of the signup input:
```
username: omar-admin
password: 123
role: admin
```

Example of the data when you sign up :

```
{
    "user": {
        "_id": "60aca3b2b68af20a82b9d956",
        "username": "omar-admin",
        "password": "$2b$10$vd3lLt7kMR9fJk8h3l3BHeB1bbfqhDRSe8GpNtAzYOWzWYFcl9k1W",
        "role":"admin"
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9tZXIxMiIsImlhdCI6MTYyMTkyNjgzNSwiZXhwIjoxNjIxOTI3NzM1fQ.Srod5-acfbXsexJU_4e-zu5y1dr4gZay51MfMvlo-7s"
}
```

### `/signin`:  POST Method

[]()


* You can signin by sending post request using postman.

Example of the data when you sign in :

**NOTE That the token received after signing in is different from the token received when the user sign-up**

```
{
    "user": {
        "_id": "60aca3b2b68af20a82b9d956",
        "username": "omar-admin",
        "password": "$2b$10$vd3lLt7kMR9fJk8h3l3BHeB1bbfqhDRSe8GpNtAzYOWzWYFcl9k1W",
        "role":"admin"
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9tZXIxMiIsImlhdCI6MTYyMTkyNzAzMywiZXhwIjoxNjIxOTI3OTMzfQ.TTIG_yaGheLW9Jm6ljivxp3MmxXWmGwxPpmFqPv0meg"
}
```


### `/users`:  GET Method


[]()

* You can access the /users route and get all the usernames available in the DB by siging in as admin user and sending a get request with bearer auth and pass the token after you signin.

Example of the received data :

```
[
    "ewies",
    "oe",
    "omar",
    "oeoeoe",
    "omer12"
]
```

### `/secret`:  GET Method

[https://oebitw-bearer-auth.herokuapp.com/secret](https://oebitw-bearer-auth.herokuapp.com/secret)

* You can access the /secret route by sending a get request with bearer auth and pass the token after you signin.

You will see the following message when you access the secret route:

```
Secret route welcomes you
```

### `api/v1/clothes`

[]()

* You can add clothes by sending post request using postman.

* You can get the data for all the clothes by sending get request.

* You can get the data for specific clothes using its ID by sending get request
` http://localhost:3030/api/v1/clothes/1215`

* You can update the data for specific clothes using its ID by sending put request
` http://localhost:3030/api/v1/clothes/1215`

* You can delete the data for specific clothes using its ID by sending delete request
` http://localhost:3030/api/v1/clothes/1215`


## Authenticated Route

If you signed up as:
1) user : you can read the data only
2) writer: you can read and post
3) editor: you can read , post, update
4) admin: you can read , post, update and delete

###  `api/v2/food`

[]()

* You can add food by sending post request using postman.

* You can get the data for all the food by sending get request.

* You can get the data for specific food using its ID by sending get request
` http://localhost:3030/api/v2/food/1514`

* You can update the data for specific food using its ID by sending put request
` http://localhost:3030/api/v2/food/1514`

* You can delete the data for specific food using its ID by sending delete request
` http://localhost:3030/api/v2/food/1514`


### `api/v2/food`

[]()

* You can add food by sending post request using postman.

* You can get the data for all the food by sending get request.

* You can get the data for specific food using its ID by sending get request
` http://localhost:3030/api/v2/food/1514`

* You can update the data for specific food using its ID by sending put request
` http://localhost:3030/api/v2/food/1514`

* You can delete the data for specific food using its ID by sending delete request
` http://localhost:3030/api/v2/food/15145`



## UML


![](./img/uml.jpg)
![](./img/uml1.jpg)
![](./img/uml3.jpg)