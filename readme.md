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