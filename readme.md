# Base URL - http://localhost:5000/api


## Auth
####    Register (POST) */auth/register*
*body*
```json
    "email":string
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
    "email":string,
    "otp":string
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
    "email":string,
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