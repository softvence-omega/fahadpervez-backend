# Base URL - http://localhost:5000/api


## Auth
####    Register (POST) */auth/register*
*body*
```json
    "email":"string"
```
*response*
```json
{
  "success": true,
  "message": "Account created successful",
  "data": "Please check your mailbox for the OTP",
  "meta": null
}
```

####    Verify Account (POST) */auth/verified-account*
*body*
```json
    "email":"string",
    "otp":"string"
```
*response*
```json
{
  "success": true,
  "message": "Account Verification successful.",
  "data": "Account verified successfully!",
  "meta": null
}
```

####    New OTP request (POST) */auth/new-verification-otp*
*body*
```json
    "email":"string",
```
*response*
```json
{
  "success": true,
  "message": "New OTP is sent to email.",
  "data": null,
  "meta": null
}
```

####    Set New Password (POST) */auth/set-new-password*
*body*
```json
    "email":"string",
    "password":"string"
```
*response*
```json
{
  "success": true,
  "message": "Password has been reset successfully.",
  "data": "Password changed successful.",
  "meta": null
}
```

####    Login User (POST) */auth/login*
*body*
```json
    "email":"string",
    "password":"string"
```
*response*
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
####    Update initial profile (POST) */auth/update-account-info*
`also need Authorization headers`

*body*
```json
    {
  "studentType": "MEDICAL_STUDENT",// MEDICAL_STUDENT, NURSING_STUDENT, DENTAL_STUDENT, PHARMACY_STUDENT, PUBLIC_HEALTH_STUDENT, DENTAL_HYGIENE_STUDENT, MEDICAL_LAB_TECHNOLOGY_STUDENT, RADIOLOGY_STUDENT, PHYSIOTHERAPY_STUDENT
  "university": "string",
  "country": "string",
  "year_of_study": "string",
  "preparingFor": "string" // come from backend
}
```
*response*
```json
{
  "success": true,
  "message": "Profile updated successfully!",
  "data": {
    "_id": "68b7a9acd0ce36ed899015e4",
    "email": "softvence.abumahid@gmail.com",
    "isDeleted": false,
    "accountStatus": "ACTIVE",
    "role": "STUDENT",
    "isVerified": true,
    "authType": "CUSTOM",
    "isSubscribed": false,
    "createdAt": "2025-09-03T02:36:28.234Z",
    "updatedAt": "2025-09-03T05:22:42.656Z",
    "profile_type": "student_profile",
    "studentType": "MEDICAL_STUDENT",
    "profile": {
      "_id": "68b7cdbaa6de6969f409dc0c",
      "accountId": "68b7a9acd0ce36ed899015e4",
      "country": "United States",
      "university": "Harvard University",
      "preparingFor": "MCAT",
      "year_of_study": "2005",
      "dailyStreak": 0,
      "point": 0,
      "completedQuiz": [],
      "completedFlashCard": [],
      "completedCase": [],
      "badges": [],
      "connectedMentor": [],
      "updatedAt": "2025-09-03T05:22:42.572Z",
      "createdAt": "2025-09-03T05:22:42.572Z"
    }
  },
  "meta": null
}
```
####    Get my profile (GET) */auth/me*
`also need Authorization headers`

*response*
```json
{
  "success": true,
  "message": "Profile info fetched successfully!",
  "data": {
    "account": {
      "_id": "68b7a9acd0ce36ed899015e4",
      "email": "softvence.abumahid@gmail.com",
      "isDeleted": false,
      "accountStatus": "ACTIVE",
      "role": "STUDENT",
      "isVerified": true,
      "authType": "CUSTOM",
      "lastOTP": "",
      "isSubscribed": false,
      "createdAt": "2025-09-03T02:36:28.234Z",
      "updatedAt": "2025-09-03T05:22:42.656Z",
      "password": "",
      "profile_id": "68b7cdbaa6de6969f409dc0c",
      "profile_type": "student_profile",
      "studentType": "MEDICAL_STUDENT"
    },
    "profile": {
      "_id": "68b7cdbaa6de6969f409dc0c",
      "accountId": "68b7a9acd0ce36ed899015e4",
      "country": "United States",
      "university": "Harvard University",
      "preparingFor": "MCAT",
      "year_of_study": "2005",
      "dailyStreak": 0,
      "point": 0,
      "completedQuiz": [],
      "completedFlashCard": [],
      "completedCase": [],
      "badges": [],
      "connectedMentor": [],
      "__v": 0,
      "updatedAt": "2025-09-03T05:22:42.572Z"
    }
  },
  "meta": null
}
```
####    Get new refreshToken (POST) */auth/refresh-token*
`also need cookie headers`

*response*
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
####    Change Password (POST) */auth/change-password*
`also need authorization header`
*body*
```json
  {
    "oldPassword":"string",
    "newPassword":"string"
  }
```
*response*
```json
{
  "success": true,
  "message": "Password changed successfully!",
  "data": "Password changed successful.",
  "meta": null
}
```
####    Forgot Password (POST) */auth/forgot-password*
*body*
```json
  {
    "email":"string",
  }
```
*response*
```json
{
  "success": true,
  "message": "We sent a OTP to your email!",
  "data": null,
  "meta": null
}
```
####    Reset Password (POST) */auth/reset-password*
*body*
```json
  {
    "email":"string",
    "otp":"string",
    "newPassword":"string"
    
}
```
*response*
```json
{
  "success": true,
  "message": "Password reset successfully!",
  "data": "Password reset successfully!",
  "meta": null
}
```
####    Change account status (POST) */auth//change-status*
*only admin can access this*
*also need authorization header / cookie*
*body*
```json
{
    {
  "email":"string",
  "status":"SUSPENDED" // INACTIVE, SUSPENDED, ACTIVE
}
}
```
*response*
```json
{
  "success": true,
  "message": "Now this account is SUSPENDED",
  "data": null,
  "meta": null
}
```