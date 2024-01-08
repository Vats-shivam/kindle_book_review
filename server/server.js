const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors')
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// MySQL connection setup
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'shivam',
  password: 'shivam',
  database: 'kindle_book_review',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Login endpoint for readers
app.post('/api/reader/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM readers WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ username: results[0].username });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

// Login endpoint for authors
app.post('/api/author/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM authors WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ username: results[0].username });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

app.post('/api/reader/addBook', (req, res) => {
  const { title, author, publication, genre, review, rating } = req.body;

  const sql = 'INSERT INTO books (title, author, publication, genre, review, rating) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, author, publication, genre, review, rating], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Book added successfully' });
    }
  });
});

app.get('/api/author/books/:authorName', (req, res) => {
  const authorName = req.params.authorName;

  const sql = 'SELECT * FROM books WHERE author = ?';
  db.query(sql, [authorName], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/reader/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});