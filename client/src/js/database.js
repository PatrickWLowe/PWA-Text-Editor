import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const JDB = await openDB("jate", 1);
  const text = JDB.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  const req = store.put({ id: 1, value: content });
  const result = await req;
  console.log(result);
};

export const getDb = async () => {
  console.log("GET from the database");
  const JDB = await openDB("jate", 1);
  const text = JDB.transaction("jate", "readonly");
  const store = text.objectStore("jate");
  const req = store.getAll();
  const result = await req;
  return result?.value;
};

initdb();
