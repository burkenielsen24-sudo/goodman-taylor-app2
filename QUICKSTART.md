# Quick Start Guide

Get the Goodman Taylor App v2 up and running in minutes!

## Option 1: Local Development (Recommended for Development)

### Step 1: Install Node.js
Make sure you have Node.js (v18+) installed:
```bash
node --version
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the App
```bash
npm run dev
```

### Step 4: Open Your Browser
Navigate to: http://localhost:3000

That's it! 🎉

## Option 2: Docker (Recommended for Production)

### Step 1: Install Docker
Make sure Docker is installed and running on your system.

### Step 2: Start the App
```bash
docker-compose up -d
```

### Step 3: Access the App
Navigate to: http://localhost:3000

To stop:
```bash
docker-compose down
```

## What You Can Do

- **Add Items**: Use the form to create new business items
- **View Items**: See all items in the list below the form
- **Delete Items**: Remove items you no longer need
- **API Access**: Use the REST API at `/api/items`

## API Examples

### Get All Items
```bash
curl http://localhost:3000/api/items
```

### Create an Item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"My Item","description":"Item details"}'
```

### Health Check
```bash
curl http://localhost:3000/health
```

## Running Tests

```bash
npm test
```

## Need Help?

Check the main [README.md](README.md) for detailed documentation.
