
import * as SQLite from 'expo-sqlite';

const sqlPath = './assets/data/QuizDB.sql';
const dbPath = './assets/data/QuizDB.db';

function checkForDatabase() {
    const db = SQLite.openDatabase(dbPath);
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS Questions;');
        tx.executeSql(sqlPath);
    });
    }

function selectTenQuestionsFromCategory(category) {
  const db = SQLite.openDatabase(dbPath);
  const query = `SELECT * FROM Questions WHERE category = '${category}' ORDER BY RANDOM() LIMIT 10;`;
  return new Promise((resolve, reject) => {
    checkForDatabase();
    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
