const express = require('express');
const router = express.Router();

// Sample data store (in production, use a real database)
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
];

// GET all items
router.get('/items', (req, res) => {
  res.json({ success: true, data: items });
});

// GET single item
router.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, error: 'Item not found' });
  }
  res.json({ success: true, data: item });
});

// POST new item
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, error: 'Name is required' });
  }
  
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    description: description || '',
  };
  
  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// PUT update item
router.put('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, error: 'Item not found' });
  }
  
  const { name, description } = req.body;
  items[itemIndex] = {
    ...items[itemIndex],
    ...(name && { name }),
    ...(description !== undefined && { description }),
  };
  
  res.json({ success: true, data: items[itemIndex] });
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, error: 'Item not found' });
  }
  
  items.splice(itemIndex, 1);
  res.json({ success: true, message: 'Item deleted' });
});

module.exports = router;
