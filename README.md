# 🚴 BikeHub - MERN Bike Marketplace

A full-stack bike marketplace built with the MERN stack where users can browse, buy, and manage bikes. The project demonstrates modern full-stack development practices including authentication, payment processing, image uploads, caching, and robust server-side validation.

##  Features

### User Features

* User registration and login
* Secure JWT authentication
* Browse available bikes
* View detailed bike listings
* Search and filter bikes
* Purchase bikes using Stripe Checkout
* Responsive user interface

### Seller Features

* Create bike listings
* Upload multiple bike images
* Edit existing listings
* Delete listings
* Manage inventory

### Performance & Security

* Redis caching for frequently accessed data
* Server-side request validation with Zod
* Protected API routes
* Secure password hashing
* Image optimization through Cloudinary

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

### Additional Technologies

* Redis (basic caching)
* Zod (API validation)
* Stripe (payments)
* Cloudinary (image storage)
* JWT Authentication
* Bcrypt

---

##  Project Structure

```
client/
├── src/
├── public/

server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
├── utils/
└── config/
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000

MONGO_URI=your_mongodb_connection

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

REDIS_URL=your_redis_url

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_publishable_key
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install server dependencies

```bash
cd server
npm install
```

Install client dependencies

```bash
cd ../client
npm install
```

Start the backend

```bash
cd server
npm run dev
```

Start the frontend

```bash
cd client
npm run dev
```

---

##  Image Uploads

Bike images are uploaded directly to Cloudinary, providing:

* Fast image delivery
* Automatic optimization
* Secure cloud storage
* Easy image management

---

##  Payments

Stripe Checkout is integrated to provide secure payment processing.

Features include:

* Secure card payments
* Checkout session creation
* Payment verification
* Success and cancel redirects

---

## Redis

Redis is used as a lightweight caching layer to reduce how many times a user can attempt to login if they enter the password wrong.

---

## Validation

All incoming API requests are validated using Zod before reaching the business logic, helping ensure:

* Consistent request formats
* Clear validation errors
* Improved API security

---

## Learning Objectives

This project was built to practice:

* Building REST APIs with Express
* MongoDB data modeling using Mongoose
* Authentication with JWT
* Redis caching
* Stripe payment integration
* Cloudinary image uploads
* Schema validation using Zod
* TypeScript in a full-stack application
* React state management and routing

---

## Future Improvements

* Wishlist functionality
* Product reviews and ratings
* Admin dashboard
* Order history
* Seller profiles
* Email notifications
* Inventory analytics
* Real-time notifications
* Advanced filtering and sorting

---

 ## License

This project is intended for educational and portfolio purposes.

---

## Author

Built as a personal portfolio project to showcase full-stack web development using the MERN stack and modern backend technologies.
