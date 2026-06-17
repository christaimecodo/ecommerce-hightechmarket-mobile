// ============================================================
// index.js — Point d'entrée de l'application
// ============================================================
// Ce fichier est le tout premier lu par Expo au démarrage.
// Son rôle : dire à React Native "voici le composant principal à afficher".
// ============================================================

import { registerRootComponent } from 'expo';
// registerRootComponent est une fonction Expo qui lance l'application.
// Elle configure automatiquement l'environnement selon le contexte
// (Expo Go sur téléphone, ou application compilée native).

import { MyAppec } from './src/MyAppec';
// MyAppec est notre composant racine, défini dans src/MyAppec.js.
// Il contient la navigation et les contextes globaux de l'app.

// On enregistre MyAppec comme point de départ de l'application.
// Quand l'app se lance, c'est ce composant qui s'affiche en premier.
registerRootComponent(MyAppec);
