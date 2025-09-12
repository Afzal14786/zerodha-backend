# 🖥️ FinVista Backend ⚡

The **FinVista Backend** powers the **_entire trading ecosystem_** — handling **authentication**, **user management**, **market data**, and **seamless interactions** between **the frontend landing page** and **the trading dashboard**.

It is built with **Node.js**, **Express.js**, **MongoDB**, **Redis**, and **Firebase**, designed to be **scalable**, **secure**, and **realistic**, **simulating** a true **_fintech-grade backend_**.

---

## Table of Contents

- [Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Authentication Flow](#-authentication-flow)
- [Folder Structure](#-folder-structure)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)

---

### ✨ Key Features

- 🔑 **Multi-Step Authentication**
  - Secure login/signup flow with Phone OTP or UserID + Email OTP.
- 📊 **Auto-Generated User Data**

  - After **signup**, random _user related data_ **_(a userImage, Bank Account Number, Bank Name, PanCard Number, Unique UserId, Demat (BO) Number, 4 digit Support Code & Segment)_** is auto-generated to make the dashboard look realistic and engaging .

- 📈 **Preloaded Market Stocks**

  - Database comes preloaded with **300+ stock entries** 📂.
  - When users search for a stock, results are instantly fetched from the DB.
  - Users can **buy stocks**, and see them reflected in:
    - `💼 /holdings/all` → Current holdings
    - `📑 /order/all` → Order status & history

- 🔐 **User Account Management**

  - **Reset Password**
  - **Forgot UserID**
  - **Change Password**
  - **Update Profile**
  - **Logout securely**

- ⚡ **High Performance with Redis**

OTPs and temporary session data are cached in Redis for blazing-fast authentication.

## 🛠️ Tech Stack

| Category                         | Technologies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️ **Core Backend**              | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white) |
| ☁️ **Cloud & Storage**           | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) ![Multer](https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge&logo=files&logoColor=white)                                                                                                                                                                                                                                                                                                                          |
| 🔐 **Authentication & Security** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/Bcrypt-0033A0?style=for-the-badge&logo=lock&logoColor=white) ![Crypto](https://img.shields.io/badge/Crypto-FF0000?style=for-the-badge&logo=bitcoin&logoColor=white)                                                                                                                   |
| 📩 **Communication & Utilities** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-009688?style=for-the-badge&logo=gmail&logoColor=white) ![Cookie-Parser](https://img.shields.io/badge/Cookie--Parser-FF9800?style=for-the-badge&logo=cookiecutter&logoColor=white) ![CORS](https://img.shields.io/badge/CORS-1976D2?style=for-the-badge&logo=shield&logoColor=white) ![Dotenv](https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white)                                                                                                 |
| 🛠️ **Dev Tools**                 | ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) ![@faker-js/faker](https://img.shields.io/badge/faker.js-2565AE?style=for-the-badge&logo=javascript&logoColor=white) ![ioredis](https://img.shields.io/badge/ioredis-DC382D?style=for-the-badge&logo=redis&logoColor=white)                                                                                                                                                                                                            |

### 🔐 Authentication Flow

1. **Signup**

   - User registers via **Landing Page**.
   - Phone/email OTP verification.
   - Password setup.
   - Random portfolio & data auto-generated for user realism.

2. **Login**

   - **Via Phone + Password** → OTP popup (from test numbers).
   - Or **UserID + Password** → OTP sent to registered email.

3. **Post-Login Features**

   - Access dashboard.
   - Buy stocks, view holdings, check orders.
   - Manage account settings.

### 📂 Folder Structure

```
📁 zerodha-backend
├── 📁 config
│   ├── 📜 cloudinary.js
│   ├── 📜 firebaseAdmin.js
│   ├── 📜 jwt.js
│   └── 📜 redisClint.js
├── 📁 controller
│   └── 📁 user
│       ├── 📜 user.login.js
│       ├── 📜 user.register.js
│       ├── 📜 user.updateProfile.js
│     ├── ⚙️ holding.controller.js
│     ├── ⚙️ order.controller.js
│     ├── ⚙️ position.controller.js
│     └── ⚙️ stock.controller.js
├── 📁 database
│   └── 📜 dbConnection.js
├── 📁 docs
├── 📁 helper
│   ├── 📜 order.helper.js
│   ├── 📜 sendMail.js
│   ├── 📜 stock.helper.js
│   └── 📜 user.helper.js
├── 📁 middleware
│   ├── 📜 auth.middleware.js
│   ├── 📜 error.js
│   ├── 📜 refresh.middleware.js
│   └── 📜 wrapError.js
├── 📁 models
│   ├── 📜 holding.model.js
│   ├── 📜 order.model.js
│   ├── 📜 position.model.js
│   └── 📜 user.model.js
├── 📁 node_modules
├── 📁 routers
│   └── 📁 user
│       ├── 📜 login.router.js
│       ├── 📜 register.router.js
│       ├── 📜 test.route.js
│       ├── 📜 user.router.js
│     ├── 📜 holding.route.js
│     ├── 📜 order.router.js
│     ├── 📜 position.router.js
│     └── 📜 stock.route.js
├── 📁 schemas
│   ├── 📜 holdings.schema.js
│   ├── 📜 order.schemas.js
│   ├── 📜 positions.schemas.js
│   ├── 📜 stock.schema.js
│   └── 📜 user.schema.js
├── 📁 services
│   └── 📜 stockService.js
├── 📜 .env
├── 📜 .gitignore
├── 📜 app.js
├── 📜 index.js
├── 📜 package-lock.json
├── 📜 package.json
└── 📜 README.md
```

## 🚀 API Endpoints

***Note :*** The base URL for all endpoints is `https://your-domain.com/api/v1`.

---

### 👤 User Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/user/register/signup` | `POST` | Initiates the phone number signup process. | None |
| `/user/register/verify-mobile` | `POST` | Verifies a phone number with an OTP. | None |
| `/user/register/lead-info` | `POST` | Saves user lead information (name, email) and sends an email OTP. | None |
| `/user/register/set-password` | `POST` | Finalizes account creation by setting a password after both phone and email are verified. | None |
| `/user/login` | `POST` | Authenticates a user with a User ID or phone number and password. Sends an OTP for verification. | None |
| `/user/login/verify-otp` | `POST` | Verifies the OTP sent during the login process to grant tokens. | None |
| `/user/profile` | `GET` | Retrieves the profile details of the authenticated user. | `JWT Token` |
| `/user/profile/upload` | `POST` | Updates the authenticated user's profile image. | `JWT Token` |
| `/user/profile/update-password` | `POST` | Changes the authenticated user's password. | `JWT Token` |
| `/user/forgot-password` | `POST` | Sends a password reset link to the user's registered email. | None |
| `/user/reset-password/:token` | `POST` | Resets the user's password using a valid reset token. | None |
| `/user/forgot-userId` | `POST` | Sends the user's User ID to their registered email. | None |
| `/user/logout` | `POST` | Logs out the user by clearing the refresh token. | `JWT Token` |

<br>

---
### 👤 User Registration Endpoints

#### **`POST /user/register/signup`**
-   **Description**: Initiates user registration by accepting a **phone number**. This is the first step of the _two-factor authentication_ for creating an account.

-   **Request Body**:  
```json
{
  "phone": "9123456789"
}
```
-   **Response Body**

```json
{
  "success": true,
  "message": "OTP sent to phone"
}
```

_**After OTP verification, if user already exist then**_  
-   **Error Response (User Exists):**  
```json
{
  "success": false,
  "message": "User already exists"
}
```  

-   **Response (User Already Exists):**  

```json
{
  "success": true,
  "userExists": true,
  "message": "User already has an account with the same number.",
  "data": {
    "user": { ... },
    "tokens": { ... }
  }
}
```

#### **`POST /user/register/verify-mobile`**  
-   **Description**: Verifies the user's mobile number by authenticating the Firebase-generated token.

-   **Request Body :**  
```json
{
  "idToken": "eyJhbGciOiJIUzI1NiI..."
}
```  

-   **Response (Success):**  
```json
{
  "success": true,
  "message": "Phone verified"
}
```

#### **`POST /user/register/lead-info`**  
-   **Description**: Collects the user's **name** and **email**. An OTP is sent to the provided **email for verification**. This endpoint is used for two distinct actions: **sending the OTP** and then **verifying it**.  

-   **Request Body (Step 1: Send OTP):**  
```json
{
  "step": "sendOtp",
  "phone": "9123456789",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```
-   **Response (Step 1: OTP Sent):**  
```json
{
  "success": true,
  "message": "Email OTP sent"
}
```

-   **Request Body (Step 2: Verify OTP):**  
```json
{
  "step": "verifyOtp",
  "email": "john.doe@example.com",
  "otp": "123456"
}
```
-   **Response (Step 2: OTP Verified):**  
```json
{
  "success": true,
  "message": "Email verified"
}
```

-   **Error Response (Invalid OTP):**  
```json
{
  "success": false,
  "message": "Invalid or expired otp"
}
```

#### **`POST /user/register/set-password`**  

-   **Description**: Finalizes the account creation by setting a password and generating all user-related data such as `userId`, `bankAccountNumber`, and a `default profile image`.  
-   **Request Body:**  

```json
{
  "phone": "9123456789",
  "password": "Techie_root1$"
}
```

-   **Response**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "60c72b2f9b1d8c001f3e7a1b",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "9123456789"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1Ni...",
      "refreshToken": "eyJhbGciOiJIUzI1Ni..."
    }
  }
}
```

-   **Error Response (Phone/Email Not Verified):**  
```json
{
  "success": false,
  "message": "Phone not verified"
}
```

---


### 👤 User Login Endpoints

#### **`POST /api/v1/user/login`**  
-   **Description**: This endpoint authenticates a user using their password. The identifier can be either a 7-digit `user ID` or a 10-digit `phone number`. Based on the identifier type, a one-time password (OTP) is sent to either the `user's email` or `phone number` for the next step.  

-   **Request Body**
```json
{
  "identifier": "QFS161I",
  "password": "Techie_root1$"
}
```
OR  

```json
{
  "identifier": "9123456789",
  "password": "Techie_root1$"
}

```

-   **Response Body (for 7-digit User ID):**  
If a 7-digit user ID is provided, an OTP is sent to the **user's registered email**.  

```json
{
  "success": true,
  "message": "OTP sent to your email.",
  "auth_type": "email",
  "identifier": "QFS161I"
}
```

OR  

-   **Response Body (for 10-digit Phone Number):**  
If a 10-digit phone number is provided, the password is verified, and the client is instructed to handle the OTP verification via **Firebase Authentication**.

```json
{
  "success": true,
  "message": "Password verified. Please verify OTP using Firebase.",
  "auth_type": "phone",
  "identifier": "9123456789"
}
```  

#### **`POST /api/v1/user/login/verify-otp`**  
-   **Description**: Finalizes the login process by verifying the OTP received in the previous step. Upon successful verification, the server issues JWT access and refresh tokens.  

-   **Request Body (for Email OTP):**
This request is used for users who logged in with a 7-digit user ID.

```json
{
  "identifier": "QFS161I",
  "otp": "123456"
}
```
-   **Request Body (for Phone OTP):**   
This request is for users who logged in with a 10-digit phone number. The client sends a static "verified" string after the phone number has been successfully `verified` by Firebase on the client-side.  

```json
{
  "identifier": "9123456789",
  "otp": "verified"
}
```

-   **Response Body :**  

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "60c72b2f9b1d8c001f3e7a1b",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "9123456789",
      "userId": "QFS161I"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1Ni...",
      "refreshToken": "eyJhbGciOiJIUzI1Ni..."
    }
  }
}
```  

*** 

### 👤 User Profile & Recovery Endpoints  
_These endpoints manage user profile data, including updates, and handle account recovery processes._  

#### **`GET /user/profile`**  

-   **Description**: Retrieves the full profile details of the authenticated user.  
-   **Authentication**: Requires a valid JWT access token.  
-   **Response**:

```json
{
  "success": true,
  "data": {
    "_id": "60c72b2f9b1d8c001f3e7a1b",
    "userId": "QFS161I",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9123456789",
    "profile": "https://res.cloudinary.com/example/image/upload/v123456789/profile_image.png",
    "bankAccountNumber": "5683572980674532",
    "bankName": "Kotak Mahindra Bank",
    "panCardNumber": "ABCDE1234F",
    "dematNumber": "DP12345678",
    "supportCode": "20240901-XYZ"
  }
}
```

#### **`POST /user/profile/upload`**  
-   **Description**: Updates the authenticated user's profile image. The image file is uploaded as `multipart/form-data`.  
-   **Authentication**: Requires a valid JWT access token.
-   **Request Body**: 
    -   This endpoint expects a `multipart/form-data` request with a field named `profile` containing the image file.

-   **Response**

```json
{
  "success": true,
  "message": "Profile image updated successfully",
  "profileUrl": "https://res.cloudinary.com/example/image/upload/v123456789/new_profile.png"
}
```

#### **`POST /user/profile/update-password`**  
-   **Description**: Changes the authenticated user's password after verifying their old password.
-   **Authentication**: Requires a valid JWT access token.
-   **Request body**:
```json
{
  "oldPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

-   **Response**: 
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

-   **Error Response (Incorrect Old Password):**

```json
{
  "success": false,
  "message": "Incorrect old password"
}
```

#### **`POST /user/forgot-password`** 
-   **Description**: Sends a password reset link to the user's registered email. This link contains a unique, time-limited token.
-   **Authentication**: None.
-   **Request Body**:

```json
{
  "email": "john.doe@example.com"
}
```

-   **Response**
```json
{
  "success": true,
  "message": "A password reset link has been sent to your email."
}
```

-   **Error Response (User Not Found):**
```json
{
  "success": false,
  "message": "User not found with provided email"
}
```

#### **`POST /user/reset-password/:token`** 
-   **Description**: Resets the user's password using the token received via email.
-   **Authentication**: None.
-   **URL Parameters**:
    - `:token` (string): The password reset token from the email link.
  
-   **Request Body:**

```json
{
  "newPassword": "newStrongPassword123"
}
```

-   **Response**:

```json
{
  "success": true,
  "message": "Password reset successfully."
}
```

-   **Error Response (Invalid/Expired Token):**

```json
{
  "success": false,
  "message": "Password reset token is expired or invalid"
}
```

#### **`POST /user/forgot-userId`**  
-   **Description**: Sends the user's unique 7-digit User ID to their registered email address.
-   **Authentication**: None.
-   **Request Body**:

```json
{
  "email": "john.doe@example.com"
}
```

-   **Response**:
```json
{
  "success": true,
  "message": "UserId send in your registered email id"
}
```

-   **Error Response (User Not Found)**: 
```json
{
  "success": false,
  "message": "With this email user not found"
}
```

#### **`POST /user/logout`**
-   **Description**: Logs out the authenticated user by deleting their refresh token from the Redis cache. This invalidates future login sessions.
-   **Authentication**: Requires a valid JWT access token.
-   **Response**: 
```json
{
  "success": true,
  "message": "Logged out successfully!"
}
```

-   **Error Response (Session Not Found)**:
```json
{
  "success": false,
  "message": "Session not found."
}
```

--- 

### 💰 Holdings Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/holdings/allHoldings` | `GET` | Fetches all stock holdings for the authenticated user, including live price data. | `JWT Token` |

#### **`GET /holdings/allHoldings`**
-   **Description**: Retrieves a list of the user's current stock holdings with enriched live data.
-   **Response**:
    ```json
    [
      {
        "name": "TCS",
        "qty": 5,
        "avg": 3500,
        "price": 3550,
        "currentValue": 17750,
        "pnl": 250,
        "net": "+1.43%",
        "day": "+50.00",
        "isLoss": false
      },
      {
        "name": "INFY",
        "qty": 10,
        "avg": 1500,
        "price": 1450,
        "currentValue": 14500,
        "pnl": -500,
        "net": "-3.33%",
        "day": "-50.00",
        "isLoss": true
      }
    ]
    ```

---

### 📊 Positions Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/positions/all-positions` | `GET` | Fetches all open stock positions for the authenticated user, including live price data. | `JWT Token` |

#### **`GET /positions/all-positions`**
-   **Description**: Retrieves a list of the user's current intraday positions.
-   **Response**:
    ```json
    [
      {
        "name": "HDFC",
        "product": "MIS",
        "qty": 20,
        "avg": 1750,
        "price": 1765.5,
        "pnl": 310,
        "net": "+0.89%",
        "day": "+15.50",
        "isLoss": false
      }
    ]
    ```

---

### 📝 Order Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/order/new-order` | `POST` | Places a new stock order (buy/sell). | `JWT Token` |
| `/order/all-orders` | `GET` | Fetches the order history for the authenticated user. | `JWT Token` |

#### **`POST /order/new-order`**
-   **Description**: Creates a new order and updates the user's holdings in a single transaction.
-   **Request Body**:
    ```json
    {
      "quantity": 5,
      "price": 3550,
      "symbol": "TCS"
    }
    ```
-   **Response**:
    ```json
    {
      "success": true,
      "message": "Order placed successfully and holding updated",
      "order": {
        "_id": "6516a504a37b3f001f54a83c",
        "user": "60c72b2f9b1d8c001f3e7a1b",
        "transactionId": "ORD-12345678",
        "ISIN": "INE001A01018",
        "symbol": "TCS",
        "quantity": 5,
        "price": 3550,
        "total": 17750,
        "status": "Executed",
        "tradeDate": "2023-09-29T10:00:00.000Z"
      }
    }
    ```

---

### 📊 Stock Endpoints

| Endpoint | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/stocks/update` | `PUT` | **(Internal)** Updates all stock prices with a random fluctuation. | None |
| `/stocks/search?q=query` | `GET` | Searches for stocks based on a query string. | None |

#### **`GET /stocks/search?q=tcs`**
-   **Description**: Searches for stocks whose symbol matches the query.
-   **Response**:
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "60c72b2f9b1d8c001f3e7a1c",
          "symbol": "TCS",
          "companyName": "Tata Consultancy Services Ltd.",
          "price": 3550,
          "change": 50,
          "percentChange": 1.43
        }
      ]
    }
    ```  


### 🚀 Getting Started  

1. **Clone the Repository**
```
git clone https://github.com/Afzal14786/zerodha-backend.git
cd zerodha-backend
```

2. **Install Dependencies**  
```
npm install
```

3. **Environment Variables**  
Create a .env file in root with:
```
### BACKEND PORT
PORT=5174

### FRONTEND API
FRONTEND_API=http://localhost:3000

### DASHBOARD API
DASHBOARD_API=http://localhost:5173

### JWT
JWT_SECRET=<your_jwt_secret_key>
JWT_EXPIRES_IN=<expiry_day>
JWT_REFRESH_SECRET=<jwt_refresh_token>
JWT_REFRESH_EXPIRES_IN=<jwt_refresh_expires>

MONGO_URL=<your_mongodb_url>

# Cloudinary SetUp
CLOUD_NAME=<your_cloudinary_name>
CLOUD_API_KEY=<your_cloud_api>
CLOUD_SECRET_KEY=<your_cloud_secret_key>

### Redis Configuration

REDIS_HOST=<your_redisdb_host>
REDIS_PORT=<your_redisdb_port_number>
REDIS_PASSWORD=<your_redis_password>

### Firebase Configiration

FIREBASE_SERVICE_ACCOUNT=<your_firebase_servie_.json_format>

### email verification
SMTP_USER=<your_email_account>
SMTP_PASS=<your_app_password>
```

4. **Run Development Server**  
```
npm run dev
```  

---  

### Note:
> ⚠️ Important:
> All the data except your `name`, `email`
> are auto generated .  
> Internally there are function running for generating dummy data
for making the project more reliestics .  
> If you are interested how it is generated so frequently,
> go through the `api endpoints` for order section as well as go through `register api endpoint`.  
> So, you get to know what kind of dummy data is generated for make this project realistics .  

---

#### Go through the dashboard & frontend repository for more details  

### 🧩 Dashboard Repository  

The **Dashboard Repository** contains the core authenticated user experience of the platform. Once users complete the multi-step signup and verification process on the FinVista landing page, the user redirected to the dashboard, where user can:  

-   **Search Strocks and place order**
-   **Manage their personal watchlist**
-   **Access detailed analytics on selected stocks**
-   **Navigate through a secure and responsive UI built specifically for active users**

📁 **Repository Link**: [Dashboard Repository](https://github.com/Afzal14786/trading-dashboard.git)  


### Frontend (FinVista)  

The **frontend repository** contain all the fintech related information as well as the signup process or creating an account .  

1. **Signup**
2. **Create an account by entering basic details like : _Name, Email, Phone Number & Set The Password_**  

📁 **Repository Link**: [FinVista Repository](https://github.com/Afzal14786/Trading-Platform)  

--- 

### ⭐ Like This Project?  
If you found this project helpful, informative, or fun to work with:
-   Give it a 🌟 star on [@GitHub](github.com/afzal14786)
-   **Follow me** for more cool projects and updates: 
    - [@GitHub](github.com/afzal14786)
    - [@LinkedIn](linkedin.com/in/mdafzal14786)
    - [@Instagram](instagram.com/mdafzal14786)
    - [@Facebook](facebook.com/mdafzal14786)
    - [@linktree](https://linktr.ee/mdafzal14786)

---  
Thank you for your support — Happy Coding! 🚀👨‍💻✨