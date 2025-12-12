# Validation and Rate Limiting Implementation

## Overview
This document describes the comprehensive validation and rate limiting implementation added to the VRL Institute backend API.

## Packages Installed
- **zod**: TypeScript-first schema validation library
- **express-rate-limit**: Rate limiting middleware for Express

## Implementation Details

### 1. Validation Middleware
**Location:** `Backend/src/middlewares/validation.middleware.ts`

A reusable validation middleware that:
- Validates request body, params, and query parameters
- Uses Zod schemas for type-safe validation
- Returns formatted error messages for invalid requests
- Returns 400 status code for validation errors

### 2. Rate Limiting Middleware
**Location:** `Backend/src/middlewares/rateLimiter.middleware.ts`

Three rate limiters implemented:

#### a. `apiLimiter` (General API)
- **Limit:** 100 requests per 15 minutes per IP
- **Applied to:** All `/api/*` routes
- **Purpose:** Prevent general API abuse

#### b. `authLimiter` (Authentication)
- **Limit:** 5 requests per 15 minutes per IP
- **Applied to:** `/api/users/register` and `/api/users/login`
- **Purpose:** Prevent brute force attacks on authentication endpoints
- **Special:** Doesn't count successful requests

#### c. `writeLimiter` (Write Operations)
- **Limit:** 30 requests per 15 minutes per IP
- **Applied to:** POST, PATCH, DELETE endpoints
- **Purpose:** Prevent abuse of write operations

### 3. Validation Schemas

All validation schemas are located in `Backend/src/validations/`:

#### User Validations (`user.validations.ts`)
- **registerUserSchema**: Validates user registration
  - Name: 1-100 characters, trimmed
  - Email: Valid email format, lowercase
  - Password: Min 8 characters, must contain uppercase, lowercase, and number
  - Role: Optional, defaults to "user", must be "admin" or "user"

- **loginUserSchema**: Validates user login
  - Email: Valid email format
  - Password: Required

#### News Blog Validations (`newsBlog.validations.ts`)
- **createNewsBlogSchema**: Validates news blog creation
- **updateNewsBlogSchema**: Validates news blog updates (all fields optional)
- **getNewsBlogByIdSchema**: Validates ID parameter
- **deleteNewsBlogSchema**: Validates ID parameter

#### Events Validations (`events.validations.ts`)
- **createEventSchema**: Validates event creation
- **updateEventSchema**: Validates event updates
- **getEventByIdSchema**: Validates ID parameter
- **deleteEventSchema**: Validates ID parameter

#### Journal Article Validations (`journalArticle.validations.ts`)
- **createJournalArticleSchema**: Validates journal article creation
- **updateJournalArticleSchema**: Validates journal article updates
- **getJournalArticleByIdSchema**: Validates article ID parameter
- **getJournalArticlesByVolumeIssueSchema**: Validates volume and issue parameters
- **getJournalArticlesByCategorySchema**: Validates category parameter
- **getLatestJournalArticlesSchema**: Validates limit query parameter (1-100)
- **deleteJournalArticleSchema**: Validates ID parameter
- **downloadJournalArticlePdfSchema**: Validates fullPath query parameter

#### Journal Volume Validations (`journalVolume.validations.ts`)
- **createJournalVolumeSchema**: Validates journal volume creation
- **updateJournalVolumeSchema**: Validates journal volume updates
- **getJournalVolumeByIdSchema**: Validates ID parameter
- **deleteJournalVolumeSchema**: Validates ID parameter
- **streamJournalVolumePdfSchema**: Validates fullPath query parameter

#### Journal Content Validations (`journalContent.validations.ts`)
- **updateJournalContentSchema**: Validates journal content updates (all fields optional)

#### Staff Validations (`staff.validations.ts`)
- **createStaffMemberSchema**: Validates staff member creation
- **updateStaffMemberSchema**: Validates staff member updates
- **getStaffMemberByIdSchema**: Validates ID parameter
- **deleteStaffMemberSchema**: Validates ID parameter

#### Publication Validations (`publication.validations.ts`)
- **createPublicationSchema**: Validates publication creation
- **updatePublicationSchema**: Validates publication updates
- **getPublicationByIdSchema**: Validates ID parameter
- **getPublicationsByCategorySchema**: Validates category parameter
- **deletePublicationSchema**: Validates ID parameter
- **generateSignedPdfUrlSchema**: Validates fullPath query parameter

#### Resource Person Validations (`resourcePerson.validations.ts`)
- **createResourcePersonSchema**: Validates resource person creation
- **updateResourcePersonSchema**: Validates resource person updates
- **getResourcePersonByIdSchema**: Validates ID parameter
- **deleteResourcePersonSchema**: Validates ID parameter

#### Home Content Validations (`homeContent.validations.ts`)
- **updateHomeContentSchema**: Validates home content updates (all fields optional)

## Security Features

### 1. Input Validation
- All user inputs are validated before processing
- Prevents NoSQL injection attacks
- Ensures data integrity
- Provides clear error messages

### 2. Rate Limiting
- Prevents brute force attacks on authentication
- Protects against DDoS attacks
- Limits write operations to prevent abuse
- Different limits for different endpoint types

### 3. MongoDB ID Validation
- All ID parameters are validated to ensure they match MongoDB ObjectId format
- Prevents invalid ID errors and potential security issues

### 4. URL Validation
- All URL fields (photo, thumbnail, documentUrl, etc.) are validated
- Ensures only valid URLs are accepted

### 5. Email Validation
- Email addresses are validated and normalized (lowercase)
- Prevents invalid email formats

### 6. Password Strength
- Passwords must be at least 8 characters
- Must contain uppercase, lowercase, and number
- Prevents weak passwords

## Route Updates

All routes have been updated to include validation middleware:

### Example Route Pattern:
```typescript
router.post("/", writeLimiter, validate(createSchema), controller);
router.get("/:id", validate(getByIdSchema), controller);
router.patch("/:id", writeLimiter, validate(updateSchema), controller);
router.delete("/:id", writeLimiter, validate(deleteSchema), controller);
```

## Error Response Format

When validation fails, the API returns:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

## Rate Limit Response Format

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

Status code: **429 Too Many Requests**

## Testing

To test validation:
1. Send invalid data to any endpoint
2. Verify you receive a 400 status with validation errors

To test rate limiting:
1. Make rapid requests to an endpoint
2. After exceeding the limit, verify you receive a 429 status

## Notes

- Date fields are optional and accept ISO datetime strings
- MongoDB ObjectIds are validated using regex pattern: `/^[0-9a-fA-F]{24}$/`
- URL fields are validated but can be nullable/optional
- All string fields are trimmed to remove leading/trailing whitespace
- Email addresses are automatically converted to lowercase

## Future Enhancements

Consider adding:
1. Custom validation for file uploads
2. More granular rate limiting per user (if authenticated)
3. Request size limits
4. Additional sanitization for HTML content
5. Validation for nested objects and arrays

