# DataShare - Frontend

Interface utilisateur de l'application **DataShare**, développée en **Angular 21**.
Ce projet fait partie de la solution logicielle de partage de fichiers sécurisée.

## 🚀 Démarrage Rapide

### Prérequis
*   Node.js v20+
*   Backend DataShare (doit être lancé sur le port `8080`)

### Installation
Installez les dépendances du projet :
```bash
npm install
```

### Lancer le serveur de développement
Pour démarrer l'application en mode local :
```bash
npm start
```
L'application sera accessible sur `http://localhost:4200`.

---

## 🧪 Tests

### Tests Unitaires (Jest)
Lancez les tests unitaires des composants et services :
```bash
npm test
```
Ou avec couverture de code :
```bash
npm run test:coverage
```

### Tests E2E (Cypress)
Lancez les tests de bout en bout (nécessite le Backend lancé) :
```bash
npx cypress run
```
Ou l'interface interactive :
```bash
npx cypress open
```

---

## 📚 Documentation Complète

Ce dépôt concerne uniquement la partie **Frontend** (Interface & Logique Client).

Pour consulter la **Documentation Technique Globale** du projet, veuillez vous référer au dépôt **Backend** qui centralise :
*   [User Stories & Fonctionnalités]
*   [Architecture & MLD]
*   [Rapport de Sécurité]
*   [Tests de Performance]
