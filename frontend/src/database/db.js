import * as SQLite from 'expo-sqlite';

export const openDB = async () => {
    
  // IMPORTANT : nouvelle connexion JSI pour éviter le NullPointerException
  const db = await SQLite.openDatabaseAsync("produits");

    return db;
}