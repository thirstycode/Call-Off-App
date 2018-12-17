# Call-Of-App API

## Documentation - 

### Authorization - 




* **/api/auth/login/**


* **Method:**
  
	`POST`

* **Data Params**

   **Required:**
 
   `email` - email of user tobe logged in<br>
   `password` - password of user tobe logged in<br>
   `userType` - one of these three - ('Buyer','Supplier','Driver')<br>


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