# API Documentation
This API allows you to create, read, update, and delete user data.
***

INSTRUCTIONS TO USE APP
1. git clone git@github.com:JamesATom/CRUD-API.git
2. Navigate to the folder and npm install or i
***

## Run Options

This application can be run in different modes depending on your needs.

### npm run start:dev

This command will start the application in development mode. In this mode, the app will be running with debugging and hot reloading enabled. This means that you can modify the code and see the changes immediately without having to restart the app. This mode is useful during development and testing.

To run the application in development mode, open a terminal and navigate to the project directory, then run:

```
npm run start:dev
```

### npm run start:prod

This command will start the application in production mode. In this mode, the app will be optimized for performance and will be running in a production-like environment. This mode is useful when you're ready to deploy the application to a production server.

To run the application in production mode, open a terminal and navigate to the project directory, then run:

```
npm run start:prod
```

### npm run start:multi

This command will start the application with a load balancer. In this mode, the app will be running multiple instances in parallel, with each instance running on a different port. This is useful when you need to handle a large number of requests and want to distribute the load across multiple servers.

To run the application with a load balancer, open a terminal and navigate to the project directory, then run:

```
npm run start:multi
```

This will start the load balancer and launch multiple instances of the application, each on a different port. The load balancer will then distribute the requests across the instances based on their availability and load.
<hr>

### Test with Jest Framework
`npm run test` - Just Run Test to make sure Integration test is successful
<hr>

## Endpoints

### GET: /api/users

Returns an array of all the users in the database.

#### Response

- Status Code: 200 OK
- Body:

  ```
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "date_of_birth": "1990-01-01"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "date_of_birth": "1995-05-05"
    }
  ]
  ```

### GET: /api/users/:id

Returns the user with the specified ID.

#### Parameters

- id: (required) the ID of the user to retrieve.

#### Response

- Status Code: 200 OK
- Body:

  ```
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "date_of_birth": "1990-01-01"
  }
  ```

### POST: /api/users

Creates a new user and returns the new user object.

#### Request Body

- name: (required) the name of the new user.
- email: (required) the email address of the new user.
- date_of_birth: (optional) the date of birth of the new user.

#### Response

- Status Code: 201 Created
- Body:

  ```
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "date_of_birth": "1992-02-02"
  }
  ```

### PUT: /api/users/:id

Updates the user with the specified ID and returns the updated user object.

#### Parameters

- id: (required) the ID of the user to update.

#### Request Body

- name: (optional) the new name of the user.
- email: (optional) the new email address of the user.
- date_of_birth: (optional) the new date of birth of the user.

#### Response

- Status Code: 200 OK
- Body:

  ```
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "date_of_birth": "1990-01-01"
  }
  ```

### DELETE: /api/users/:id

Deletes the user with the specified ID.

#### Parameters

- id: (required) the ID of the user to delete.

#### Response

- Status Code: 204 No Content

---
