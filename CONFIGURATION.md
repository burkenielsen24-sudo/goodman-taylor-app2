# Configuration Guide

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

### Available Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port number for the server |
| `NODE_ENV` | `development` | Environment mode (`development`, `production`, `test`) |

Example `.env` file:
```
PORT=3000
NODE_ENV=development
```

## Rate Limiting

Default configuration:
- **Window**: 15 minutes
- **Max Requests**: 100 per IP address

To modify, edit `src/server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Change this
  max: 100, // Change this
});
```

## CORS Configuration

CORS is enabled for all origins by default. To restrict origins, edit `src/server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

## Static File Serving

Static files are served from the `public/` directory:
- `public/css/` - Stylesheets
- `public/js/` - JavaScript files
- `public/index.html` - Main HTML page

## API Customization

API routes are defined in `src/routes/api.js`. Add new routes as needed:

```javascript
router.get('/my-endpoint', (req, res) => {
  res.json({ message: 'Hello!' });
});
```

## Database Integration

Currently using in-memory storage. To add a database:

1. Install database driver (e.g., `npm install pg` for PostgreSQL)
2. Create connection in `src/config/database.js`
3. Update API routes to use database queries

## Security Headers

Security headers are configured via Helmet middleware. To customize, edit `src/server.js`:

```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Add more directives
    },
  },
}));
```

## Production Deployment

### Environment Setup
```bash
export NODE_ENV=production
export PORT=3000
```

### Using PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start src/server.js --name goodman-taylor-app
pm2 startup
pm2 save
```

### Using Docker
Build and run:
```bash
docker build -t goodman-taylor-app2 .
docker run -d -p 3000:3000 --name app goodman-taylor-app2
```

Or with Docker Compose:
```bash
docker-compose up -d
```

## Logging

Add logging middleware for production:
```bash
npm install morgan
```

In `src/server.js`:
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## Performance Tips

1. **Enable compression**:
   ```bash
   npm install compression
   ```
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Use a reverse proxy** (Nginx/Apache) in production

3. **Enable caching** for static files

4. **Use a CDN** for static assets

## Troubleshooting

### Port in Use
Change the port in `.env` or use:
```bash
PORT=8080 npm start
```

### Permission Denied
On Linux/Mac, ports below 1024 require root:
```bash
sudo PORT=80 npm start
```
Or use a port ≥1024.

### Module Not Found
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```
