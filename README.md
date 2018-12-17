# Call-Of-App API

## Documentation - 

### Authorization - 




* **/api/auth/login/**

  <_The URL Structure (path only, no root url)_>

* **Method:**
  
  <_The request type_>  `POST`

* **Data Params**

   **Required:**
 
   `email` - email of user tobe logged in
   `password` - password of user tobe logged in
   `userType` - one of these three - ('Buyer','Supplier','Driver')


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "success": true,
    "msg": "home page",
    "data": [
        {
            "username": "pratik",
            "email": "driver3@gmail.com",
            "userType": "Driver"
        }
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZHJpdmVyM0BnbWFpbC5jb20iLCJpYXQiOjE1NDUwMzI4MTV9.WXFnj2RAzAxeMyIIIrFIj78sDFjvHtF0JyXspMwnWxI"
}`