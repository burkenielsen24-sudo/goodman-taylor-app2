// API base URL
const API_BASE = '/api';

// DOM elements
const addItemForm = document.getElementById('addItemForm');
const itemNameInput = document.getElementById('itemName');
const itemDescriptionInput = document.getElementById('itemDescription');
const itemsContainer = document.getElementById('itemsContainer');

// Load items on page load
document.addEventListener('DOMContentLoaded', () => {
  loadItems();
});

// Add item form submission
addItemForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = itemNameInput.value.trim();
  const description = itemDescriptionInput.value.trim();
  
  try {
    const response = await fetch(`${API_BASE}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      showMessage('Item added successfully!', 'success');
      itemNameInput.value = '';
      itemDescriptionInput.value = '';
      loadItems();
    } else {
      showMessage(data.error || 'Failed to add item', 'error');
    }
  } catch (error) {
    showMessage('Error adding item: ' + error.message, 'error');
  }
});

// Load all items
async function loadItems() {
  try {
    const response = await fetch(`${API_BASE}/items`);
    const data = await response.json();
    
    if (data.success) {
      displayItems(data.data);
    } else {
      itemsContainer.innerHTML = '<p class="error">Failed to load items</p>';
    }
  } catch (error) {
    itemsContainer.innerHTML = `<p class="error">Error loading items: ${error.message}</p>`;
  }
}

// Display items
function displayItems(items) {
  if (items.length === 0) {
    itemsContainer.innerHTML = '<p class="loading">No items yet. Add one above!</p>';
    return;
  }
  
  itemsContainer.innerHTML = items.map(item => `
    <div class="item-card" data-id="${item.id}">
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.description || 'No description')}</p>
      <small>ID: ${item.id}</small>
      <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
    </div>
  `).join('');
}

// Delete item
async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/items/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (data.success) {
      showMessage('Item deleted successfully!', 'success');
      loadItems();
    } else {
      showMessage(data.error || 'Failed to delete item', 'error');
    }
  } catch (error) {
    showMessage('Error deleting item: ' + error.message, 'error');
  }
}

// Show message
function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = type;
  messageDiv.textContent = message;
  
  const main = document.querySelector('main');
  main.insertBefore(messageDiv, main.firstChild);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
