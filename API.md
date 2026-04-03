# API Documentation
*All request body fields are required unless specified otherwise.*

## Index

### User Endpoints
- [Login User](#get-apiuserlogin)
- [Get User Details](#get-apiuseruserdetails-protected)
- [Signup User](#post-apiusersignup)
- [Update User](#patch-apiuserupdateuser-protected)
- [Delete User](#delete-apiuserdeleteuser-protected)

### Note Endpoints
- [Get Note Details](#get-apinotenotedetails-protected)
- [Get User Notes](#get-apinoteusernotes-protected)
- [Search Notes by Tag](#get-apinotesearchbytag-protected)
- [Get Top Tags](#get-apinotetags-protected)
- [Create Note](#post-apinotecreatenote-protected)
- [Update Note](#patch-apinoteupdatenote-protected)
- [Delete Note](#delete-apinotedeletenote-protected)

## User Endpoints

### GET /api/user/login
Description:
Logs the user in.

Request Body:
- username: string
- password: string

Response:
- success: boolean
- message: string
- user: object
- token: string

[*Back to Index*](#index)
### GET /api/user/userDetails (protected)
Description:
Retrieves details about the user.

Response:
- success: boolean
- message: string
- user: object

[*Back to Index*](#index)
### POST /api/user/signup
Description:
Create a new user account.

Request Body:
- username: string
- password: string
- email: string
- firstName: string
- lastName: string

Response:
- success: boolean
- message: string
- user: object
- token: string

[*Back to Index*](#index)
### PATCH /api/user/updateUser (protected)
Description:
Updates requested fields for user. At least one field must be passed in to the request.

Request Body:
- (optional) username: string
- (optional) password: string
- (optional) email: string
- (optional) firstName: string
- (optional) lastName: string

Response:
- success: boolean
- message: string
- user: object

[*Back to Index*](#index)
### DELETE /api/user/deleteUser (protected)
Description:
Deletes the user's account as well as any associated notes.

Response:
- success: boolean
- message: string
- user: object

[*Back to Index*](#index)

## Note Endpoints

### GET /api/note/noteDetails (protected)
Description:
Retrieves information about the requested note.

Request Body:
- noteId: string

Response:
- success: boolean
- message: string
- note: object

[*Back to Index*](#index)
### GET /api/note/userNotes (protected)
Description:
Retrieves all notes associated with the user, sorted in descending order by the 'updatedAt' field.

Response:
- success: boolean
- message: string
- notes: object[]

[*Back to Index*](#index)
### GET /api/note/searchByTag (protected)
Description:
Retrieves all of the user's notes that include the requested tag(s).

Request Body:
- tags: string[]

Response:
- success: boolean
- message: string
- notes: object[]

[*Back to Index*](#index)
### GET /api/note/tags (protected)
Description:
Retrieves the top 5 most used tags by the user.

Response:
- success: boolean
- message: string
- tags: object[]

[*Back to Index*](#index)
### POST /api/note/createNote (protected)
Description:
Creates a new note by the user.

Request Body:
- (optional) title: string
- (optional) content: string
- (optional) tags: string[]

Response:
- success: boolean
- message: string
- note: object

[*Back to Index*](#index)
### PATCH /api/note/updateNote (protected)
Description:
Updates requested fields for note. At least one field must be passed in to the request.

Request Body:
- (optional) title: string
- (optional) content: string
- (optional) tags: string[]

Response:
- success: boolean
- message: string
- note: object

[*Back to Index*](#index)
### DELETE /api/note/deleteNote (protected)
Description:
Deletes the requested note.

Request Body:
- noteId: string

Response:
- success: boolean
- message: string
- note: object

[*Back to Index*](#index)