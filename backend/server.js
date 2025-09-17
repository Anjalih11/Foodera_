require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// =======================
// REGISTER
// =======================
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      if (results.length > 0) {
        return res.json({ success: false, message: 'Username already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email],
        (err, result) => {
          if (err) return res.status(500).json({ success: false, message: err.message });

          res.json({ success: true, message: 'Registered successfully! Now please login.' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =======================
// LOGIN
// =======================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (results.length === 0) {
      return res.json({ success: false, message: 'Invalid username or password.' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.json({ success: false, message: 'Invalid username or password.' });
    }
  });
});

// =======================
// CHEF FORM SUBMISSION
// =======================
app.post('/ask-chef', (req, res) => {
  const { name, recipe } = req.body;

  if (!name || !recipe) {
    return res.status(400).json({ success: false, message: 'Name and recipe are required.' });
  }

  db.query('INSERT INTO recipes (name, recipe) VALUES (?, ?)', [name, recipe], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    res.json({ success: true, message: 'Your recipe has been submitted successfully!' });
  });
});

// =======================
// FOOD FACTS API
// =======================
app.get("/food-facts", (req, res) => {
  const query = "SELECT * FROM food_facts";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (results.length === 0) {
      return res.json({ success: false, message: "No facts available." });
    }

    const randomFact = results[Math.floor(Math.random() * results.length)];
    res.json({ success: true, data: randomFact });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



