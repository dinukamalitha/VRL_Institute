# Security Audit Report - VRL Institute

**Date:** January 2025  
**Scope:** Full codebase security review with focus on CVE-2025-55182 and CVE-2025-66478

---

## Executive Summary

This security audit identified **1 CRITICAL**, **3 HIGH**, and **2 MEDIUM** severity security vulnerabilities in the VRL Institute codebase. While the specific CVEs (CVE-2025-55182 and CVE-2025-66478) do not directly apply due to React 18 usage, there are several other critical security issues that require immediate attention.

---

## 1. CVE-2025-55182 (React Server Components) - ✅ NOT VULNERABLE

### Status: **SAFE**

**Analysis:**
- **React Version:** 18.3.1 (not React 19)
- **Next.js Version:** 15.5.6 (installed, but package.json shows ^15.4.4)
- **Vulnerable Packages:** None found directly installed
- **Server Components Usage:** No "use server" directives found in codebase

**Vulnerability Details:**
- CVE-2025-55182 affects React Server Components packages (react-server-dom-webpack, react-server-dom-parcel, react-server-dom-turbopack) versions 19.0.0 through 19.2.0
- This codebase uses React 18.3.1, which is not affected

**Recommendation:**
- ✅ **No action required** for this CVE
- However, if upgrading to React 19 in the future, ensure you use patched versions (19.0.1, 19.1.2, or 19.2.1)

---

## 2. CVE-2025-66478 (Next.js RSC) - ⚠️ POTENTIALLY VULNERABLE

### Status: **REQUIRES VERIFICATION**

**Analysis:**
- **Next.js Version:** 15.5.6 (installed from package-lock.json)
- **Package.json specifies:** ^15.4.4
- **Patched versions for 15.x:** 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7

**Issue:**
- Current installed version is **15.5.6**, which is **BETWEEN** vulnerable versions and the patched version **15.5.7**
- This version may still be vulnerable

**Recommendation:**
1. **IMMEDIATELY** update Next.js to the latest patched version:
   ```bash
   cd Frontend
   npm install next@15.5.7
   ```
   Or update to the latest 15.x version:
   ```bash
   npm install next@latest
   ```

2. Verify the update:
   ```bash
   npm list next
   ```

3. Test the application thoroughly after update

---

## 3. CRITICAL: Hardcoded Database Credentials

### Severity: **CRITICAL**

**Location:** `Backend/migrate-mongo-config.js:7`

**Issue:**
```javascript
url: "mongodb+srv://dinukamalitha2001_db_user:gQrQELtAbxXcKlhH@cluster0.hrbgy2d.mongodb.net/VRL?retryWrites=true&w=majority&appName=Cluster0",
```

**Risk:**
- Database credentials are hardcoded in source code
- If this repository is public or shared, credentials are exposed
- Allows unauthorized database access
- Violates security best practices

**Remediation:**
1. **IMMEDIATELY** rotate the MongoDB password in your MongoDB Atlas dashboard
2. Update `migrate-mongo-config.js` to use environment variables:
   ```javascript
   url: process.env.MONGO_URI || "mongodb://localhost:27017/VRL",
   ```
3. Add `migrate-mongo-config.js` to `.gitignore` if it contains sensitive data
4. Create a `.env.example` file with placeholder values
5. Ensure `.env` files are in `.gitignore`

---

## 4. HIGH: Hardcoded JWT Secret Fallback

### Severity: **HIGH**

**Location:** `Backend/src/middlewares/auth.ts:5`

**Issue:**
```typescript
const JWT_SECRET = ENV.JWT_SECRET || "supersecret";
```

**Risk:**
- If `JWT_SECRET` environment variable is not set, uses weak default "supersecret"
- Allows attackers to forge JWT tokens if they know the default secret
- Compromises authentication system

**Remediation:**
1. Remove the fallback and require JWT_SECRET to be set:
   ```typescript
   const JWT_SECRET = ENV.JWT_SECRET;
   if (!JWT_SECRET) {
     throw new Error("JWT_SECRET environment variable is required");
   }
   ```
2. Update `Backend/src/config/env.ts` to validate required environment variables:
   ```typescript
   export const ENV = {
     PORT: process.env.PORT || 5000,
     NODE_ENV: process.env.NODE_ENV || "development",
     MONGO_URI: process.env.MONGO_URI as string,
     JWT_SECRET: process.env.JWT_SECRET as string
   };
   
   // Validate required environment variables
   if (!ENV.MONGO_URI) {
     throw new Error("MONGO_URI environment variable is required");
   }
   if (!ENV.JWT_SECRET) {
     throw new Error("JWT_SECRET environment variable is required");
   }
   ```
3. Ensure JWT_SECRET is a strong, randomly generated string (at least 32 characters)
4. Rotate JWT_SECRET if it was ever set to "supersecret" in production

---

## 5. HIGH: Unrestricted CORS Configuration

### Severity: **HIGH**

**Location:** `Backend/src/app.ts:20`

**Issue:**
```typescript
app.use(cors());
```

**Risk:**
- Allows requests from ANY origin
- Enables Cross-Site Request Forgery (CSRF) attacks
- Allows unauthorized websites to make requests to your API
- Exposes API endpoints to any origin

**Remediation:**
1. Configure CORS to only allow specific origins:
   ```typescript
   import cors from "cors";
   
   const corsOptions = {
     origin: function (origin, callback) {
       const allowedOrigins = [
         process.env.FRONTEND_URL || 'http://localhost:3000',
         process.env.PRODUCTION_FRONTEND_URL
       ].filter(Boolean);
       
       // Allow requests with no origin (mobile apps, Postman, etc.) in development
       if (process.env.NODE_ENV === 'development' && !origin) {
         return callback(null, true);
       }
       
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     },
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
   };
   
   app.use(cors(corsOptions));
   ```
2. Add `FRONTEND_URL` and `PRODUCTION_FRONTEND_URL` to environment variables
3. Test API calls from frontend after implementing

---

## 6. HIGH: XSS Vulnerabilities via dangerouslySetInnerHTML

### Severity: **HIGH**

**Locations:**
- `Frontend/src/app/journal/page.tsx` (9 instances)
- `Frontend/src/app/admin/journal/page.tsx` (9 instances)
- `Frontend/src/sections/NewsBlog/newsBlogView.tsx` (1 instance)
- `Frontend/src/sections/Events/eventView.tsx` (1 instance)

**Issue:**
Content from the database is rendered using `dangerouslySetInnerHTML` without sanitization:
```typescript
dangerouslySetInnerHTML={{ __html: welcomeText }}
```

**Risk:**
- Cross-Site Scripting (XSS) attacks if malicious scripts are stored in the database
- Attackers could inject JavaScript that executes in users' browsers
- Could steal authentication tokens, session data, or perform actions on behalf of users

**Remediation:**
1. Install a HTML sanitization library:
   ```bash
   cd Frontend
   npm install dompurify
   npm install --save-dev @types/dompurify
   ```
2. Create a sanitization utility:
   ```typescript
   // Frontend/src/utils/sanitize.ts
   import DOMPurify from 'dompurify';
   
   export const sanitizeHTML = (dirty: string): string => {
     return DOMPurify.sanitize(dirty, {
       ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a'],
       ALLOWED_ATTR: ['href', 'target', 'rel'],
     });
   };
   ```
3. Update all `dangerouslySetInnerHTML` usages:
   ```typescript
   import { sanitizeHTML } from '@/utils/sanitize';
   
   // Replace:
   dangerouslySetInnerHTML={{ __html: welcomeText }}
   // With:
   dangerouslySetInnerHTML={{ __html: sanitizeHTML(welcomeText || '') }}
   ```
4. Also sanitize on the backend before storing in database (defense in depth)

---

## 7. MEDIUM: Missing Input Validation

### Severity: **MEDIUM**

**Locations:** Multiple backend controllers

**Issue:**
- No input validation middleware (e.g., express-validator, joi, zod)
- User input is directly used in database queries without validation
- No sanitization of user inputs

**Risk:**
- NoSQL injection attacks
- Data corruption
- Unexpected application behavior
- Potential for other injection attacks

**Remediation:**
1. Install validation library:
   ```bash
   cd Backend
   npm install express-validator
   ```
2. Create validation middleware for each endpoint:
   ```typescript
   // Example for user registration
   import { body, validationResult } from 'express-validator';
   
   export const validateRegister = [
     body('email').isEmail().normalizeEmail(),
     body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
     body('name').trim().isLength({ min: 1 }).escape(),
     body('role').isIn(['admin', 'user']).optional(),
   ];
   
   // In route handler:
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   ```
3. Implement validation for all user input endpoints
4. Use Mongoose schema validation as additional layer

---

## 8. MEDIUM: Missing Rate Limiting

### Severity: **MEDIUM**

**Issue:**
- No rate limiting on API endpoints
- Vulnerable to brute force attacks on login endpoints
- Vulnerable to DDoS attacks

**Remediation:**
1. Install rate limiting library:
   ```bash
   cd Backend
   npm install express-rate-limit
   ```
2. Implement rate limiting:
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   // General API rate limit
   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   // Stricter limit for auth endpoints
   const authLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5 // limit each IP to 5 requests per windowMs
   });
   
   app.use('/api', apiLimiter);
   app.use('/api/users/login', authLimiter);
   app.use('/api/users/register', authLimiter);
   ```

---

## Additional Security Recommendations

### 1. Environment Variable Security
- ✅ Ensure all `.env` files are in `.gitignore`
- ✅ Never commit secrets to version control
- ✅ Use different secrets for development and production
- ✅ Rotate secrets regularly

### 2. Authentication & Authorization
- Implement role-based access control (RBAC) checks on all protected endpoints
- Add refresh token mechanism for better security
- Implement session timeout
- Add password strength requirements

### 3. Error Handling
- Don't expose sensitive error messages to clients
- Log errors securely on the server
- Use generic error messages for authentication failures

### 4. HTTPS
- Ensure HTTPS is enabled in production
- Use secure cookies if implementing cookie-based auth
- Set secure flags on cookies

### 5. Dependency Management
- Regularly run `npm audit` to check for vulnerable dependencies
- Keep all dependencies up to date
- Use `npm audit fix` to automatically fix vulnerabilities where possible

### 6. Security Headers
- Implement security headers (helmet.js for Express):
  ```bash
  npm install helmet
  ```
  ```typescript
  import helmet from 'helmet';
  app.use(helmet());
  ```

---

## Priority Action Items

### Immediate (Within 24 hours):
1. ⚠️ **Rotate MongoDB credentials** (hardcoded in migrate-mongo-config.js)
2. ⚠️ **Update Next.js to 15.5.7 or latest** (CVE-2025-66478)
3. ⚠️ **Remove hardcoded JWT secret fallback**
4. ⚠️ **Configure CORS properly**

### High Priority (Within 1 week):
5. ⚠️ **Implement HTML sanitization** for all dangerouslySetInnerHTML usages
6. ⚠️ **Add input validation** to all backend endpoints
7. ⚠️ **Implement rate limiting**

### Medium Priority (Within 1 month):
8. Add security headers (helmet.js)
9. Implement comprehensive error handling
10. Set up automated security scanning in CI/CD

---

## Verification Steps

After implementing fixes:

1. **Verify Next.js update:**
   ```bash
   cd Frontend
   npm list next
   # Should show 15.5.7 or higher
   ```

2. **Test CORS configuration:**
   - Try accessing API from unauthorized origin (should fail)
   - Try accessing from authorized origin (should succeed)

3. **Test XSS protection:**
   - Try injecting `<script>alert('XSS')</script>` in journal content
   - Verify it's sanitized and doesn't execute

4. **Test rate limiting:**
   - Make multiple rapid requests to login endpoint
   - Verify rate limit is enforced

5. **Run security audit:**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Conclusion

While the specific CVEs (CVE-2025-55182 and CVE-2025-66478) don't directly apply to this codebase, there are several critical security vulnerabilities that require immediate attention. The most critical issue is the hardcoded database credentials, which should be addressed immediately.

All identified vulnerabilities have clear remediation steps provided above. It is recommended to address the "Immediate" priority items within 24 hours to secure the application.

---

**Report Generated By:** Security Audit Tool  
**Last Updated:** January 2025

