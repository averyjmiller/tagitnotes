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