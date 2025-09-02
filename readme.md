# Base URL - http://localhost:5000/api


## Auth
####    Register (POST) */aut/register*
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