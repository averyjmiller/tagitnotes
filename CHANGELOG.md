# Changelog

All notable changes to **Tag-it Notes** will be documented here.  
This project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Features to be implemented for MVP
1. User authentication
    - Sign up / login / logout
    - Store passwords securely
    - Only show user's their own notes
2. CRUD for notes
    - Create a note (title + content)
    - Read notes (list or grid view)
    - Update note details
    - Delete notes
3. Tagging
    - Add multiple tags to a note
    - Filter/search notes by tags

---

## [0.0.1] - 2026-03-30
### Added
- Repo initalized (backend + frontend folders)
- package.json initialized
- Basic React + Vite frontend project created
- Basic Express backend server created

## [0.1.0] - 2026-04-01
### Added
- User registration and login endpoints
- Password hashing with bcrypt
- Protected endpoints using JWT authentication
- User profile update endpoint
- Validation for email format and unique username/email
- Account deletion

## [0.2.0] - 2026-04-03
### Added
- Implemented Note api, including creating, reading, updating, and deleting notes
- Added tag logic to Note models, including search by tag and displaying top 5 used tags by the user
- Added validation to tags to normalize how tags are saved to the database
- Added virtuals to the Note schema to display title and content previews for get requests
### Fixed
- User routes use proper HTTP methods now, including patch and delete
- Refactored code to follow best practices
- Patched a vulnerability where passwords weren't being hashed when updating user details
- Fixed authentication issue where controllers were not using the user object sent from the JWT token
- Fixed small bugs in the User Schema

## [0.2.1] - 2026-04-03
### Added
- Added API documentation with working index
- Added default schema type to content field in the Note schema
### Fixed
- Standardized tag type to accept only string arrays in the searchByTag controller