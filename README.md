# Goodman Taylor App v2

Software application for multiple business purposes - second version

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd goodman-taylor-app2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration (default PORT is 3000)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

5. **Run in production mode**
   ```bash
   npm start
   ```

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🐳 Docker Deployment

### Using Docker

Build and run with Docker:
```bash
docker build -t goodman-taylor-app2 .
docker run -p 3000:3000 goodman-taylor-app2
```

### Using Docker Compose

```bash
docker-compose up -d
```

To stop:
```bash
docker-compose down
```

## 📁 Project Structure

```
goodman-taylor-app2/
├── src/
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── public/
│   ├── css/             # Stylesheets
│   ├── js/              # Frontend JavaScript
│   └── index.html       # Main HTML file
├── tests/               # Test files
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── package.json        # Project dependencies and scripts
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm test` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint the codebase

## 📡 API Endpoints

### Health Check
- `GET /health` - Check application health status

### Items API
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

### Request/Response Examples

**Create Item (POST /api/items)**
```json
{
  "name": "Example Item",
  "description": "This is an example"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Example Item",
    "description": "This is an example"
  }
}
```

## 🌟 Features

- ✅ RESTful API with Express
- ✅ Modern frontend with vanilla JavaScript
- ✅ Responsive design
- ✅ Docker support
- ✅ Comprehensive test suite
- ✅ Environment-based configuration
- ✅ Security headers with Helmet
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ Error handling

## 🔒 Security

This application includes:
- Helmet for security headers
- CORS configuration
- Input validation
- XSS protection in frontend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC

## 🆘 Troubleshooting

**Port already in use**
- Change the PORT in your `.env` file to use a different port

**Dependencies not installing**
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Tests failing**
- Make sure no other instance of the app is running on port 3000
- Run `npm test` in a clean environment

## 📞 Support

For issues and questions, please open an issue in the repository.

