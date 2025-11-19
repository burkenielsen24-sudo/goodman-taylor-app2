const request = require('supertest');
const { app, server } = require('../src/server');

describe('API Endpoints', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/items', () => {
    it('should return all items', async () => {
      const response = await request(app).get('/api/items');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const newItem = {
        name: 'Test Item',
        description: 'Test Description',
      };
      const response = await request(app)
        .post('/api/items')
        .send(newItem);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newItem.name);
      expect(response.body.data.id).toBeDefined();
    });

    it('should fail without name', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ description: 'No name' });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/items/:id', () => {
    it('should return a specific item', async () => {
      const response = await request(app).get('/api/items/1');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app).get('/api/items/9999');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/items/:id', () => {
    it('should update an item', async () => {
      const updates = {
        name: 'Updated Item',
        description: 'Updated Description',
      };
      const response = await request(app)
        .put('/api/items/1')
        .send(updates);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updates.name);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .put('/api/items/9999')
        .send({ name: 'Test' });
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an item', async () => {
      // First create an item to delete
      const createResponse = await request(app)
        .post('/api/items')
        .send({ name: 'To Delete', description: 'Will be deleted' });
      
      const itemId = createResponse.body.data.id;
      
      const response = await request(app).delete(`/api/items/${itemId}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      // Verify it's deleted
      const getResponse = await request(app).get(`/api/items/${itemId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app).delete('/api/items/9999');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
