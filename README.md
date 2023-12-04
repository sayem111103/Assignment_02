## **STEP-01**

**Install all Node Modules**

## **STEP-02**

**Set Your .env file according to the code**

## **STEP-03**

**After setup your .env file go to cmd and type : npm run start:dev**

**You can also run the server using - npm run start - but if you want use this command first you have to run build command for compile. That's it you are good to go.**


## **To Create User Json Format and Route :**
**Endpoint : POST /api/users**

**{
        "userId": "123456789898",
        "username": "john_doe",
        "password": "hashed_password",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "age": 25,
        "email": "john.doe@example.com",
        "isActive": true,
        "hobbies": [
            "Reading",
            "Traveling",
            "writing"
        ],
        "address": {
            "street": "123 Main Street",
            "city": "Cityville",
            "country": "Countryland"
        }
}**


## **To Retrieve All User and Specific User :**

**Endpoint : GET /api/users**

**Endpoint : GET /api/users/:userId**
 
## **To Update The User :**

**Endpoint : PUT /api/users/:userId**

**You can update any Field within the user created data**

## **To Delete an User :**

**Endpoint : DELETE /api/users/:userId**

## **Add New Order or Create One Json Format :**
**Endpoint : PUT /api/users/:userId/orders**

**{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}**

##  **Retrieve all orders for a specific user :**
**Endpoint : GET /api/users/:userId/orders**

## **Calculate Total Price of Orders for a Specific User :**
**Endpoint : GET /api/users/:userId/orders/total-price**