# API Documentation

Base URL: http://localhost:5000/api

---

## 📑 Table of Contents

- [Account Data Types](#account-data-types)
- [Auth Endpoints](#auth-endpoints)
  - [Register](#register-post-authregister)
  - [Verify Account](#verify-account-post-authverified-account)
  - [New OTP Request](#new-otp-request-post-authnew-verification-otp)
  - [Set New Password](#set-new-password-post-authset-new-password)
  - [Login User](#login-user-post-authlogin)
  - [Login with google](#login-with-google-post-authsign-in-with-google)
  - [Update Account Information](#update-account-information-post-authupdate-account-info)
  - [Get My Profile](#get-my-profile-get-authme)
  - [Get New Refresh Token](#get-new-refreshtoken-post-authrefresh-token)
  - [Change Password](#change-password-post-authchange-password)
  - [Forgot Password](#forgot-password-post-authforgot-password)
  - [Reset Password](#reset-password-post-authreset-password)
  - [Change Account Status (Admin)](#change-account-status-post-authchange-status)
- [Student Profile](#student-profile)
  - [Update Student Profile](#update-student-profile-patch-studentupdate)

---

## Account Data Types

```ts
const AUTH_CONSTANTS = {
  STUDENT_TYPES: {
    MEDICAL_STUDENT: "MEDICAL_STUDENT",
    NURSING_STUDENT: "NURSING_STUDENT",
    DENTAL_STUDENT: "DENTAL_STUDENT",
    PHARMACY_STUDENT: "PHARMACY_STUDENT",
    PUBLIC_HEALTH_STUDENT: "PUBLIC_HEALTH_STUDENT",
    DENTAL_HYGIENE_STUDENT: "DENTAL_HYGIENE_STUDENT",
    MEDICAL_LAB_TECHNOLOGY_STUDENT: "MEDICAL_LAB_TECHNOLOGY_STUDENT",
    RADIOLOGY_STUDENT: "RADIOLOGY_STUDENT",
    PHYSIOTHERAPY_STUDENT: "PHYSIOTHERAPY_STUDENT",
  },
};

type ProfileType = "student_profile" | "mentor_profile" | "admin_profile";
export type TStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type TAccount = {
  email: string;
  role: "ADMIN" | "STUDENT" | "MENTOR";
  password: string;
  profile_id: Types.ObjectId;
  isDeleted?: boolean;
  accountStatus?: TStatus;
  studentType?: keyof typeof AUTH_CONSTANTS.STUDENT_TYPES;
  isSubscribed?: boolean;
  lastOTP?: string;
  isVerified?: boolean;
  profile_type: ProfileType;
  authType?: "GOOGLE" | "CUSTOM";
};
```
---

## Auth Endpoints
### Register (POST) /auth/register


`Request Body`
```json
{
  "email": "string"
}
```
`Response`

``` json
{
  "success": true,
  "message": "Account created successful",
  "data": "Please check your mailbox for the OTP",
  "meta": null
}
```


---

### Verify Account (POST) /auth/verified-account


`Request Body`

```json
{
  "email": "string",
  "otp": "string"
}
```
`Response`

```json
{
  "success": true,
  "message": "Account Verification successful.",
  "data": "Account verified successfully!",
  "meta": null
}
```
---


### New OTP Request (POST) /auth/new-verification-otp


`Request Body`

```json
{
  "email": "string"
}
```
`Response`

```json
{
  "success": true,
  "message": "New OTP is sent to email.",
  "data": null,
  "meta": null
}
```

---

### Set New Password (POST) /auth/set-new-password


`Request Body`
```json
{
  "email": "string",
  "password": "string"
}
```
`Response`

```json
{
  "success": true,
  "message": "Password has been reset successfully.",
  "data": "Password changed successful.",
  "meta": null
}
```

---

### Login User (POST) /auth/login


`Request Body`

```json
{
  "email": "string",
  "password": "string"
}
```

`Response`

```json
{
  "success": true,
  "message": "User is logged in successful !",
  "data": {
    "accessToken": "string",
    "role": "STUDENT" // ADMIN, MENTOR, STUDENT
  },
  "meta": null
}
```
---

### Login with google (POST) /auth/sign-in-with-google

`Request Body`

```json
{
  "email": "string",
  "password": "string"
}
```

`Response`

```json
{
  "success": true,
  "message": "User is logged in successful !",
  "data": {
    "accessToken": "string",
    "role": "STUDENT" // ADMIN, MENTOR, STUDENT
  },
  "meta": null
}
```

---

### Update Account Information (POST) /auth/update-account-info

*🔑 Requires Authorization Header*

`Request Body`

```json
{
  "studentType": "MEDICAL_STUDENT",
  "university": "string",
  "country": "string",
  "year_of_study": "string",
  "preparingFor": "string"
}
```
`Response`
```json
{
  "success": true,
  "message": "Profile updated successfully!",
  "data": {
    "_id": "68b7a9acd0ce36ed899015e4",
    "email": "softvence.abumahid@gmail.com",
    "role": "STUDENT",
    "studentType": "MEDICAL_STUDENT",
    "profile": {
      "university": "Harvard University",
      "country": "United States",
      "preparingFor": "MCAT",
      "year_of_study": "2005"
    }
  },
  "meta": null
}
```

---

### Get My Profile (GET) /auth/me


*🔑 Requires Authorization Header*

`Response`

```json
{
  "success": true,
  "message": "Profile info fetched successfully!",
  "data": {
    "account": { ... } // same for every user,
    "profile": { ... } // change for each role like student/admin/mentor
  },
  "meta": null
}
```

---

### Get New RefreshToken (POST) /auth/refresh-token


*🔑 Requires Cookie Header*

`Response`

```json 
{
  "success": true,
  "message": "Access token generated successfully!",
  "data": {
    "accessToken": "string"
  },
  "meta": null
  }
```


---

### Change Password (POST) /auth/change-password


*🔑 Requires Authorization Header*

`Request Body`

```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```
`Response`

```json
{
  "success": true,
  "message": "Password changed successfully!",
  "data": "Password changed successful.",
  "meta": null
}
```

---

### Forgot Password (POST) /auth/forgot-password


`Request Body`

```json
{
  "email": "string"
}
```
`Response`

```json
{
  "success": true,
  "message": "We sent a OTP to your email!",
  "data": null,
  "meta": null
}
```

---

### Reset Password (POST) /auth/reset-password


`Request Body`

```json
{
  "email": "string",
  "otp": "string",
  "newPassword": "string"
}
```
`Response`

```json
{
  "success": true,
  "message": "Password reset successfully!",
  "data": "Password reset successfully!",
  "meta": null
}
```


---

### Change Account Status (POST) /auth/change-status


*⚠️ Only Admin Can Access*
*🔑 Requires Authorization Header / Cookie*

`Request Body`

```json
{
  "email": "string",
  "status": "SUSPENDED" // ACTIVE, INACTIVE, SUSPENDED
}
```
`Response`

```json
{
  "success": true,
  "message": "Now this account is SUSPENDED",
  "data": null,
  "meta": null
}
```

---

## Student Profile

### Update Student Profile (PATCH) /student/update


*⚠️ Only Student Can Access*
*🔑 Requires Authorization Header / Cookie*
*📦 Content-Type: multipart/form-data*

`Form Fields`

| Name  | Type  | Value             |
|-------|-------|-------------------|
| image | File  | any type of image |
| data  | string| stringify         |

`Example data field`

```ts
{
  firstName?: string,
  lastName?: string,
  phone?: string,
  country?: string,
  university?: string,
  preparingFor?: string,
  bio?: string,
  year_of_study?: string
}
```

`Response`

```json
{
  "success": true,
  "message": "Profile update successful",
  "data": {
    "_id": "68b7cdbaa6de6969f409dc0c",
    "university": "Harvard University",
    "country": "United States",
    "firstName": "Abumahid Islam",
    "lastName": "Islam Maruf",
    "phone": "01111111",
    "profile_photo": "https://res.cloudinary.com/.../image.png"
  },
  "meta": null
}
```
