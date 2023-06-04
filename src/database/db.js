const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS channels (
      id TEXT PRIMARY KEY,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      channel_id TEXT,
      message TEXT,
      user INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (channel_id) REFERENCES channels(id)
    )
  `);
});

const insertChannel = (name) => {
  const id = uuidv4();
  const insertQuery = `INSERT INTO channels (id, name) VALUES (?, ?)`;
  db.run(insertQuery, [id, name], (err) => {
    if (err) {
      console.error("Error inserting channel:", err);
    } else {
      console.log("Channel inserted successfully");
    }
  });
};

const insertMessage = (channelId, message, user) => {
  const id = uuidv4();
  const insertQuery = `INSERT INTO messages (id, channel_id, message, user) VALUES (?, ?, ?, ?)`;
  db.run(insertQuery, [id, channelId, message, user], (err) => {
    if (err) {
      console.error("Error inserting message:", err);
    } else {
      console.log("Message inserted successfully");
    }
  });
};

const getMessagesByChannel = (channelId, callback) => {
  const selectQuery = `SELECT * FROM messages WHERE channel_id = ?`;
  db.all(selectQuery, [channelId], (err, rows) => {
    if (err) {
      console.error("Error retrieving messages:", err);
    } else {
      callback(rows);
    }
  });
};

export default {
  insertChannel,
  insertMessage,
  getMessagesByChannel,
};
