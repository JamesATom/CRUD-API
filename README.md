# API Documentation
This API allows you to create, read, update, and delete user data.
***

INSTRUCTIONS TO USE APP
1. git clone git@github.com:JamesATom/CRUD-API.git
2. Navigate to the folder and npm install or i
***
### Run Options
`npm run start:dev`   - application is run in development mode<br>
`npm run start:prod`  - application is run in production mode<br>
`npm run start:multi` - application is run with Load Balancer<br>
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
