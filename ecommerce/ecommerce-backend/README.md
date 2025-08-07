# E-commerce Backend API

A complete e-commerce backend built with Express.js, MongoDB, and JWT authentication.

## Features

- **User Authentication**: Registration and login with JWT tokens
- **Role-based Access**: Admin and user roles with different permissions
- **Product Management**: CRUD operations for products (admin only)
- **Order Management**: Users can place orders, admins can manage all orders
- **Data Validation**: Zod schemas for request validation
- **Security**: Password hashing, rate limiting, and CORS protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: bcryptjs, helmet, express-rate-limit

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `env.example`:
   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```

5. Start MongoDB locally or use a cloud service

6. Run the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```

### Products

#### Get All Products (Public)
```
GET /api/products?page=1&limit=10&category=electronics&search=laptop&sort=price
```

#### Get Single Product (Public)
```
GET /api/products/:id
```

#### Create Product (Admin Only)
```
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "electronics",
  "stock": 10,
  "image": "https://example.com/laptop.jpg"
}
```

#### Update Product (Admin Only)
```
PUT /api/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 899.99,
  "stock": 15
}
```

#### Delete Product (Admin Only)
```
DELETE /api/products/:id
Authorization: Bearer <admin_token>
```

#### Get Categories (Public)
```
GET /api/products/categories/list
```

### Orders

#### Create Order (Authenticated Users)
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "64f1a2b3c4d5e6f7a8b9c0d1",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "notes": "Please deliver in the morning"
}
```

#### Get User's Orders
```
GET /api/orders/my-orders?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

#### Get Single Order
```
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Get All Orders (Admin Only)
```
GET /api/orders?page=1&limit=10&status=pending&userId=64f1a2b3c4d5e6f7a8b9c0d1
Authorization: Bearer <admin_token>
```

#### Update Order Status (Admin Only)
```
PATCH /api/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "processing"
}
```

#### Get Order Statistics (Admin Only)
```
GET /api/orders/stats/overview
Authorization: Bearer <admin_token>
```

## Order Statuses

- `pending`: Order is placed but not yet processed
- `processing`: Order is being prepared
- `shipped`: Order has been shipped
- `delivered`: Order has been delivered
- `cancelled`: Order has been cancelled

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Responses

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

## Validation

All requests are validated using Zod schemas. Common validation rules:

- **Email**: Must be a valid email format
- **Password**: Minimum 6 characters
- **Name**: Minimum 2 characters, maximum 50
- **Price**: Must be positive number
- **Stock**: Must be non-negative integer
- **Quantity**: Must be positive integer

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation with Zod

## Database Models

### User
- name, email, password, role (user/admin)
- Timestamps for creation and updates

### Product
- name, description, price, category, stock
- isActive flag, createdBy reference
- Text index for search functionality

### Order
- user reference, items array, totalAmount
- status, shippingAddress, paymentStatus
- Timestamps for creation and updates

## Development

### Project Structure
```
├── models/          # Mongoose models
├── routes/          # Express routes
├── middleware/      # Custom middleware
├── validations/     # Zod validation schemas
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

### Environment Variables
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: Token expiration time

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client.

### Example: Creating an Admin User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Example: Creating a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "name": "iPhone 15",
    "description": "Latest iPhone with advanced features",
    "price": 999.99,
    "category": "electronics",
    "stock": 50
  }'
```

## License

ISC 