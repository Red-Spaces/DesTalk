import { v4 as uuidv4 } from "uuid";

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("app-gpt-db", 1);

    request.onerror = (event) => {
      reject(new Error("Failed to open the database"));
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("channels")) {
        const channelsStore = db.createObjectStore("channels", {
          keyPath: "id",
        });
        channelsStore.createIndex("created_at", "created_at", {
          unique: false,
        });
        channelsStore.createIndex("updated_at", "updated_at", {
          unique: false,
        });
      }

      if (!db.objectStoreNames.contains("messages")) {
        const messagesStore = db.createObjectStore("messages", {
          keyPath: "id",
        });
        messagesStore.createIndex("channel_id", "channel_id", {
          unique: false,
        });
        messagesStore.createIndex("created_at", "created_at", {
          unique: false,
        });
        messagesStore.createIndex("updated_at", "updated_at", {
          unique: false,
        });
      }
    };
  });
};

const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

const insertChannel = async (name) => {
  const db = await openDatabase();
  const tx = db.transaction("channels", "readwrite");
  const store = tx.objectStore("channels");
  const channel = {
    id: uuidv4(),
    name,
    created_at: getCurrentTimestamp(),
    updated_at: getCurrentTimestamp(),
  };

  store.add(channel);
  await tx.complete;

  return channel.id;
};

const insertMessage = async (channelId, message, user) => {
  const db = await openDatabase();
  const tx = db.transaction("messages", "readwrite");
  const store = tx.objectStore("messages");
  const msg = {
    id: uuidv4(),
    channel_id: channelId,
    message,
    user,
    created_at: getCurrentTimestamp(),
    updated_at: getCurrentTimestamp(),
  };

  store.add(msg);
  await tx.complete;

  return msg.id;
};

const getMessagesByChannel = async (channelId) => {
  const db = await openDatabase();
  const tx = db.transaction("messages", "readonly");
  const store = tx.objectStore("messages");
  const index = store.index("channel_id");

  const request = index.getAll(channelId);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const messages = request.result.sort((a, b) => {
        return new Date(a.updated_at) - new Date(b.updated_at);
      });
      resolve(messages);
    };

    request.onerror = () => {
      reject(new Error("Failed to retrieve messages by channel"));
    };

    tx.oncomplete = () => {
      const messages = request.result.sort((a, b) => {
        return new Date(a.updated_at) - new Date(b.updated_at);
      });
      resolve(messages);
    };
  });
};

const getChannels = async () => {
  const db = await openDatabase();
  const tx = db.transaction("channels", "readonly");
  const store = tx.objectStore("channels");

  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const channels = request.result.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
      resolve(channels);
    };

    request.onerror = () => {
      reject(new Error("Failed to retrieve channels"));
    };

    tx.oncomplete = () => {
      const channels = request.result.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
      resolve(channels);
    };
  });
};

const deleteChannel = async (channelId) => {
  const db = await openDatabase();
  const tx = db.transaction(["channels", "messages"], "readwrite");
  const channelsStore = tx.objectStore("channels");
  const messagesStore = tx.objectStore("messages");
  const indexedMessages = messagesStore.index("channel_id");
  const request = indexedMessages.openCursor(IDBKeyRange.only(channelId));

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      messagesStore.delete(cursor.primaryKey);
      cursor.continue();
    }
    channelsStore.delete(channelId);
  };

  await tx.complete;
};

const dbOperations = {
  insertChannel,
  insertMessage,
  getMessagesByChannel,
  getChannels,
  deleteChannel,
};

export default dbOperations;
