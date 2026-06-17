import { openDB } from "./db";

export const InsertUser = async (nom, prenom, email, telephone, motDePasse) => {
  const db = await openDB();

  // Nettoyer le téléphone (enlever les espaces, comme dans ton formulaire)
  const telNettoye = telephone.replace(/\s/g, "");

  await db.runAsync(
    'INSERT INTO Users (Nom, Prenom, Email, Telephone, Password) VALUES (?,?,?,?,?);',
    [nom, prenom, email, telNettoye, motDePasse]
  );

  console.log(`Utilisateur "${prenom} ${nom}" ajouté`);
};


// verifier si l'utilisateur existe dans la BD
export const VerifUser = async (email, motDePasse) => {
  const db = await openDB();

  const result = await db.getAllAsync(
    'SELECT * FROM Users WHERE Email = ? AND Password = ?;',
    [email, motDePasse]
  );

  // Si trouvé, on retourne le 1er utilisateur, sinon null
  return result.length > 0 ? result[0] : null;
};
