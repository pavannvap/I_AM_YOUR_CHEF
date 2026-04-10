const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

// health check
app.get('/', (req, res) => {
  res.send('Chef App API Running');
});

app.get('/db-test', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json(result.rows);
    } catch (err) {
      console.error(err); 
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/profile', auth, async (req, res) => {
    try {
      const userResult = await pool.query('SELECT id, name, email FROM users WHERE id=$1', [req.user.id]);
      res.json(userResult.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = app;