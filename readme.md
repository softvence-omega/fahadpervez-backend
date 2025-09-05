# API Documentation

Base URL: https://fahadpervez-backend.onrender.com/api

---

## 📑 Table of Contents

- [Account Data Types](#account-data-types)
- [Student Data Types](#student-data-types)
- [Clinical Case Data Types](#clinical-case-data-types)
- [Social Post Data Types](#social-post-data-types)
- [Dummy Response For AI](#dummy-response-for-ai)
  - [Case Data Types](#case-data-types)
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
- [Clinical Case Endpoints](#clinical-case-endpoints)
  - [Create new Case](#create-new-case-post-clinical-casecreate-new)
  - [Get All Clinical Case](#get-all-clinical-case-get-clinical-case)
  - [Get Single Clinical Case](#get-single-clinical-case-get-clinical-casecaseid)
  - [Update Clinical Case](#update-clinical-case-patch-clinical-casecaseid)
  - [Delete Clinical Case](#delete-clinical-case-delete-clinical-casecaseid)
- [Social Post Endpoints](#social-post-endpoints)
  - [Create new post](#create-new-post-post-social-post)
  - [Get all Social Post](#get-all-social-post-get-social-post)
  - [Get single post](#get-single-post-get-social-postpostid)
  - [Update post](#update-post-patch-social-postpostid)
  - [Delete post](#delete-post-delete-social-postpostid)





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

## Student Data Types

```ts
type TStudent = {
    accountId: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    phone?: string,
    country?: string,
    university?: string,
    preparingFor?: string,
    bio?: string,
    year_of_study?: string,
    profile_photo?: string,
    dailyStreak?: number,
    point?: number,
    completedQuiz?: Types.ObjectId[],
    completedFlashCard?: Types.ObjectId[],
    completedCase?: Types.ObjectId[],
    badges?: Types.ObjectId[],
    connectedMentor?: Types.ObjectId[],
}

```
---
## Social Post Data Types
```ts
type TSocialPost = {
    postedBy: Types.ObjectId;
    profileType: "admin_profile" | "student_profile" | "mentor_profile";
    topic: string;
    content: string;
    postImage?: string;
    reaction?: number;
    share?: number;
    isDeleted: boolean;
}
```
## Clinical Case Data Types

```ts
interface TClinicalCase {
    publishedBy: Types.ObjectId;
    caseName: string;
    topic: string;
    patientDetails?: TPatientDetails;
    caseHistory?: string;
    vital_signs?: TVitalSigns;
    laboratory_result?: TLaboratoryResult;
    imaging_studies?: string[];
    caseTips?: string[];
    studentDecision?: TStudentDecision[];
    detailedExplanation?: {
        explanation: string;
        keyFeatures: string[]
    };
    isDeleted: boolean;
}

type TPatientDetails = {
    age: number;
    sex: TSex;
    ethnicity: string;
    occupation: string;
    remark: string;
}

type TSex = 'MALE' | 'FEMALE' | 'OTHER';

type TVitalSigns = {
    temperature: string;
    heartRate: string;
    bloodPressure: string;
    respiratoryRate: string;
    generalAppearance: string[];
    abdominalExamination: string[];
}

type TLaboratoryResult = {
    testName: string;
    testResult: string;
    subTest?: {
        testName: string;
        testResult: string;
        refValue: string;
    }[];
}

type TStudentDecision = {
    question: string;
    supportingEvidence: string[];
    refutingEvidence: string[];
    isCorrect: boolean;
}
```


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
  "name": "string", // optional from google
  "photo":"string" // optional from google
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


## Clinical Case Endpoints

### Create new Case (POST) /clinical-case/create-new

*⚠️ Only Admin and Mentor Can Access*
*🔑 Requires Authorization Header / Cookie*

`Request Body`
```ts
  {
    publishedBy?: string;
    caseName: string;
    topic: string;
    patientDetails?: {
      age: number;
      sex: "MALE" | "FEMALE" | "OTHER";
      ethnicity: string;
      occupation: string;
      remark: string;
  };
  caseHistory?: string;
  vital_signs?: {
    temperature: string;
    heartRate: string;
    bloodPressure: string;
    respiratoryRate: string;
    generalAppearance: string[];
    abdominalExamination: string[];
  };
  laboratory_result?: {
    testName: string;
    testResult: string;
    subTest?: {
      testName: string;
      testResult: string;
      refValue: string;
    }[];
  };
  imaging_studies?: string[];
  caseTips?: string[];
  studentDecision?: {
    question: string;
    supportingEvidence: string[];
    refutingEvidence: string[];
    isCorrect: boolean;
  }[];
  detailedExplanation?: {
    explanation: string;
    keyFeatures: string[];
  };
  isDeleted?: boolean;
}
```
`Response`

```json
{
  "success": true,
  "message": "Clinical case created!",
  "data": {....}
  "meta": null
}
```
---
### Get all clinical Case (GET) /clinical-case
`Params`--> `page`,`limit`
`Response`
```json
{
  "success": true,
  "message": "Clinical case fetched!",
  "data": [
    {
      "_id": "68b967b4a7aa2b75cf3b4889",
      "publishedBy": {
        "_id": "68b96709af6bef0d916390b1",
        "accountId": "68b96709af6bef0d916390af",
        "firstName": "Admin",
        "lastName": "admin",
        "profile_photo": "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "__v": 0
      },
      "caseName": "Acute Appendicitis",
      "topic": "Cardiology",
      "patientDetails": {
        "age": 23,
        "sex": "MALE",
        "ethnicity": "Asian",
        "occupation": "Student",
        "remark": "No significant past medical history"
      },
      "caseHistory": "Patient presents with 2-day history of right lower quadrant abdominal pain, nausea, and mild fever.",
      "vital_signs": {
        "temperature": "38.2°C",
        "heartRate": "102 bpm",
        "bloodPressure": "118/76 mmHg",
        "respiratoryRate": "20 breaths/min",
        "generalAppearance": [
          "Mildly ill-looking",
          "Guarding abdomen"
        ],
        "abdominalExamination": [
          "Tenderness in right iliac fossa",
          "Rebound tenderness present"
        ]
      },
      "laboratory_result": {
        "testName": "CBC",
        "testResult": "Elevated WBC count",
        "subTest": [
          {
            "testName": "WBC",
            "testResult": "14,500 /µL",
            "refValue": "4,000 - 11,000 /µL"
          },
          {
            "testName": "Neutrophils",
            "testResult": "82%",
            "refValue": "40 - 70%"
          }
        ]
      },
      "imaging_studies": [
        "Ultrasound abdomen showing inflamed appendix"
      ],
      "caseTips": [
        "Always rule out gynecological causes in females",
        "Pain migration is a key feature"
      ],
      "studentDecision": [
        {
          "question": "Is this appendicitis?",
          "supportingEvidence": [
            "Right lower quadrant tenderness",
            "Fever",
            "Elevated WBC"
          ],
          "refutingEvidence": [
            "No diarrhea",
            "No urinary symptoms"
          ],
          "isCorrect": true
        },
        {
          "question": "Should immediate surgery be done?",
          "supportingEvidence": [
            "Typical clinical presentation",
            "Positive ultrasound findings"
          ],
          "refutingEvidence": [
            "Patient is hemodynamically stable"
          ],
          "isCorrect": false
        }
      ],
      "detailedExplanation": {
        "explanation": "Acute appendicitis is inflammation of the appendix due to obstruction, commonly by a fecolith.",
        "keyFeatures": [
          "Right iliac fossa pain",
          "Fever",
          "Leukocytosis",
          "Rebound tenderness"
        ]
      },
      "isDeleted": false,
      "isAIGenerated": false,
      "createdAt": "2025-09-04T10:19:32.046Z",
      "updatedAt": "2025-09-04T10:19:32.046Z"
    },
  ],
  "meta": {
    "page": 1,
    "limit": "5",
    "skip": 0,
    "total": 5,
    "totalPages": 1
  }
}
```
### Get Single Clinical Case (GET) /clinical-case/:caseId
`Params-> caseId Needed`

`Response`
```json
  // One Clinical case with admin or mentor profile
```
### Update Clinical Case (PATCH) /clinical-case/:caseId
*⚠️ Only Admin and Mentor Can Access*
*🔑 Requires Authorization Header / Cookie*

`Request body`
```json
  // all filed ar optional, flow data structure and update easily
```
`Response`
```json
  // new updated case are returned
```
### Delete Clinical Case (DELETE) /clinical-case/:caseId
*⚠️ Only Admin and Mentor Can Access*
*🔑 Requires Authorization Header / Cookie*

`Response`
```json
  {
    "success":true,
    "message":"Case is deleted"
  }
```
## Social Post Endpoints

### Create new post (POST) /social-post
*🔑 Requires Authorization Header / Cookie*
*📦 Content-Type: multipart/form-data*

`Form Fields`

| Name  | Type  | Value             |
|-------|-------|-------------------|
| image | File  | any type of image |
| data  | string| stringify         |

`Example data field`

```json
{
  "topic":"Biology",
  "content":"Hello this is test post"
}
```
`Response`
```json
{
    "success": true,
    "message": "Social post created!",
    "data": {
        "postedBy": "68b96709af6bef0d916390b1",
        "profileType": "admin_profile",
        "topic": "Biology",
        "postImage": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757055157/kq6bqiya6agwtx0onf8f.png",
        "content": "Hello this is test post",
        "reaction": 0,
        "share": 0,
        "isDeleted": false,
        "_id": "68ba88b5368ee6f38b3d4b18",
        "createdAt": "2025-09-05T06:52:37.544Z",
        "updatedAt": "2025-09-05T06:52:37.544Z"
    },
    "meta": null
}
```
---
### Get all Social Post (GET) /social-post
*🔑 Requires Authorization Header / Cookie*

`Query Params you can pass->>> page,limit`

`Response`
```json
{
    "success": true,
    "message": "Social post fetched!",
    "data": [
        {
            "_id": "68ba88b5368ee6f38b3d4b18",
            "postedBy": {
                "_id": "68b96709af6bef0d916390b1",
                "accountId": "68b96709af6bef0d916390af",
                "firstName": "Admin",
                "lastName": "admin",
                "profile_photo": "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
                "__v": 0
            },
            "profileType": "admin_profile", // student_profile, mentor_profile
            "topic": "Biology",
            "postImage": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757055157/kq6bqiya6agwtx0onf8f.png",
            "content": "Hello this is test post",
            "reaction": 0,
            "share": 0,
            "isDeleted": false,
            "createdAt": "2025-09-05T06:52:37.544Z",
            "updatedAt": "2025-09-05T06:52:37.544Z"
        },
        {....}
    ],
    "meta": {
        "total": 6,
        "page": 1,
        "limit": 10,
        "totalPages": 1,
        "skip": 0
    }
}

```

### Get single post (GET) /social-post/:postId
*🔑 Requires Authorization Header / Cookie*

`Query Params you can pass->>> isShared = true for share count`

`Response`
```json
{
    "success": true,
    "message": "Social post fetched!",
    "data": {
        "_id": "68ba88b5368ee6f38b3d4b18",
        "postedBy": {
            "_id": "68b96709af6bef0d916390b1",
            "accountId": "68b96709af6bef0d916390af",
            "firstName": "Admin",
            "lastName": "admin",
            "profile_photo": "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            "__v": 0
        },
        "profileType": "admin_profile",
        "topic": "Biology",
        "postImage": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757055157/kq6bqiya6agwtx0onf8f.png",
        "content": "Hello this is test post",
        "reaction": 0,
        "share": 4,
        "isDeleted": false,
        "createdAt": "2025-09-05T06:52:37.544Z",
        "updatedAt": "2025-09-05T08:41:37.195Z"
    },
    "meta": null
}
```
### Update post (PATCH) /social-post/:postId
*🔑 Requires Authorization Header / Cookie*
*📦 Content-Type: multipart/form-data*

`Form Fields`

| Name  | Type  | Value             |
|-------|-------|-------------------|
| image | File  | any type of image |
| data  | string| stringify         |

`Example data field`

```json
{
  "topic":"Biology", // optional
  "content":"Hello this is test post" // optional
}
```
`Response`

```json
{
    "success": true,
    "message": "Social post updated!",
    "data": {
        "_id": "68ba88b5368ee6f38b3d4b18",
        "postedBy": "68b96709af6bef0d916390b1",
        "profileType": "admin_profile",
        "topic": "Biology",
        "postImage": "https://res.cloudinary.com/dnxsk9rgl/image/upload/v1757055157/kq6bqiya6agwtx0onf8f.png",
        "content": "hello",
        "reaction": [
            "0"
        ],
        "share": 6,
        "isDeleted": false,
        "createdAt": "2025-09-05T06:52:37.544Z",
        "updatedAt": "2025-09-05T08:52:50.446Z"
    },
    "meta": null
}

```

### Delete post (DELETE) /social-post/:postId
*🔑 Requires Authorization Header / Cookie*

`Response`
```json
{
    "success": true,
    "message": "Social post deleted!",
    "data": null,
    "meta": null
}
```

## Dummy Response For AI
### Case Data Types
`GET-> dummy/clinical-case`
```json
{
    "caseName": "Acute Appendicitis",
    "patientDetails": {
      "age": 23,
      "sex": "MALE",
      "ethnicity": "Asian",
      "occupation": "Student",
      "remark": "No significant past medical history"
    },
    "caseHistory": "Patient presents with 2-day history of right lower quadrant abdominal pain, nausea, and mild fever.",
    "vital_signs": {
      "temperature": "38.2°C",
      "heartRate": "102 bpm",
      "bloodPressure": "118/76 mmHg",
      "respiratoryRate": "20 breaths/min",
      "generalAppearance": [
        "Mildly ill-looking",
        "Guarding abdomen"
      ],
      "abdominalExamination": [
        "Tenderness in right iliac fossa",
        "Rebound tenderness present"
      ]
    },
    "laboratory_result": {
      "testName": "CBC",
      "testResult": "Elevated WBC count",
      "subTest": [
        {
          "testName": "WBC",
          "testResult": "14,500 /µL",
          "refValue": "4,000 - 11,000 /µL"
        },
        {
          "testName": "Neutrophils",
          "testResult": "82%",
          "refValue": "40 - 70%"
        }
      ]
    },
    "imaging_studies": [
      "Ultrasound abdomen showing inflamed appendix"
    ],
    "caseTips": [
      "Always rule out gynecological causes in females",
      "Pain migration is a key feature"
    ],
    "studentDecision": [
      {
        "question": "Is this appendicitis?",
        "supportingEvidence": [
          "Right lower quadrant tenderness",
          "Fever",
          "Elevated WBC"
        ],
        "refutingEvidence": [
          "No diarrhea",
          "No urinary symptoms"
        ],
        "isCorrect": true
      },
      {
        "question": "Should immediate surgery be done?",
        "supportingEvidence": [
          "Typical clinical presentation",
          "Positive ultrasound findings"
        ],
        "refutingEvidence": [
          "Patient is hemodynamically stable"
        ],
        "isCorrect": false
      }
    ],
    "detailedExplanation": {
      "explanation": "Acute appendicitis is inflammation of the appendix due to obstruction, commonly by a fecolith.",
      "keyFeatures": [
        "Right iliac fossa pain",
        "Fever",
        "Leukocytosis",
        "Rebound tenderness"
      ]
    }
  }
```