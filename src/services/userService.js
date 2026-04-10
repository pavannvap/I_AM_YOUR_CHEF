const pool = require('../config/db');

const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email FROM users WHERE id=$1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};

module.exports = { getUserById };