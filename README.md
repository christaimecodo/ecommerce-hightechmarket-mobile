# E-commerce Mobile

Projet d’application e-commerce mobile fait avec **React Native (Expo)**, et une API **Node/Express + MongoDB** côté serveur.
On y retrouve l’essentiel : **catalogue**, **recherche**, **panier**, et **authentification** (les utilisateurs sont stockés en local via **SQLite**).

## Ce que l’app fait

* Affiche un **catalogue de produits** (via l’API MongoDB + possibilité de données locales selon ton implémentation).
* **Recherche** d’articles.
* **Panier** : ajout/suppression, modification des quantités, calcul du total.
* **Inscription / connexion** avec persistance en **SQLite**.
* **Profil utilisateur** + session gérée localement.

## Avant de lancer

* **Node.js + npm**
* **Expo Go** (sur téléphone) ou un émulateur Android/iOS
* **MongoDB** en local

## Installation

### 1) API (backend)

```bash
cd backend
npm install
```

Assure-toi que **MongoDB tourne** et que tu as une base `instadb2` avec une collection **Produits**.
La connexion Mongo est définie dans :

* `backend/src/db.js`

### 2) Application mobile (frontend)

```bash
cd frontend
npm install
```

## Démarrage

### 1) Lancer l’API

```bash
cd backend
node src/server.js
```

Par défaut, l’API écoute sur : `http://localhost:6000`.

#### Cas important : téléphone / Android (Expo Go)

Si tu testes sur un téléphone, `localhost` ne pointe pas sur ton PC.
Du coup, remplace l’URL de l’API par l’**IP locale** de ta machine dans :

* `frontend/src/screens/Cataloguemongodb.jsx`

Exemple :

`http://192.168.1.10:6000/api/produits`

### 2) Lancer l’app Expo

```bash
cd frontend
npx expo start
```

Tu peux ensuite :

* scanner le QR code avec **Expo Go**, ou
* lancer l’app sur un émulateur via les options Expo.

## Stack utilisée (en bref)

* **Backend** : Express + Mongoose + MongoDB
* **Frontend** : React Native (Expo) + React Navigation
* **Local** : SQLite (stockage des utilisateurs / session)

