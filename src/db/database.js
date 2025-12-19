const Dexie = require('dexie');

const db = new Dexie('ExpenseTrackerDB');

// Database schema
db.version(2).stores({
    expenses: 'id, date, categoryId, name, amount',
    categories: 'id, name, color',
    settings: 'key, value',
    incoming: 'id, date, name, amount' // Track incoming money
});


db.open().catch(err => console.error('Failed to open db:', err));


module.exports = { db };