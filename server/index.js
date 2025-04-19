const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { getBotResponse } = require('./chatbot');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`CREATE TABLE chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    characterId INTEGER,
    sender TEXT,
    text TEXT,
    image TEXT,
    timestamp TEXT
  )`);
});

app.get('/api/chat/:characterId', (req, res) => {
  const { characterId } = req.params;
  db.all(
    'SELECT sender, text, image, timestamp FROM chats WHERE characterId = ? ORDER BY timestamp',
    [characterId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ messages: rows });
    }
  );
});

app.post('/api/chat/:characterId', (req, res) => {
  const { characterId } = req.params;
  const { message } = req.body;
  const timestamp = new Date().toISOString();

  db.run(
    'INSERT INTO chats (characterId, sender, text, timestamp) VALUES (?, ?, ?, ?)',
    [characterId, 'user', message, timestamp],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
    }
  );

  const response = getBotResponse(characterId, message);

  db.run(
    'INSERT INTO chats (characterId, sender, text, image, timestamp) VALUES (?, ?, ?, ?, ?)',
    [characterId, 'bot', response.text, response.image || null, timestamp],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ response });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));