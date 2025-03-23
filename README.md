# Voting DApp Project

Ce projet est une application décentralisée (DApp) de vote construite avec Solidity, Hardhat, et Next.js. Elle permet aux utilisateurs de participer à un processus de vote sécurisé et transparent sur la blockchain Ethereum.

## Fonctionnalités

- **Contrat intelligent Voting** : 
  - Gestion des phases de workflow (enregistrement des votants, soumission des propositions, sessions de vote, comptage des votes).
  - Enregistrement des votants par l'administrateur.
  - Soumission des propositions par les votants enregistrés.
  - Vote sur les propositions par les votants enregistrés.
  - Comptage des votes pour déterminer la proposition gagnante.

- **Frontend avec Next.js** :
  - Connexion au portefeuille Ethereum via MetaMask.
  - Interaction avec le contrat intelligent pour soumettre des propositions et voter.
  - Affichage de l'état actuel du workflow et des informations utilisateur.

## Structure du projet

```
.
├── contracts/          # Contrats intelligents Solidity
│   └── Voting.sol      # Contrat principal de vote
├── frontend/           # Application frontend Next.js
│   ├── app/            # Pages et styles
│   ├── constants/      # ABI et adresses des contrats
│   └── public/         # Fichiers statiques
├── ignition/           # Scripts de déploiement
├── test/               # Tests Hardhat
└── hardhat.config.ts   # Configuration Hardhat
```

## Prérequis

- Node.js (v16 ou supérieur)
- Hardhat
- MetaMask (extension navigateur)
- Un réseau Ethereum (local ou testnet comme Sepolia)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Kameoc/Project-Dapp.git
   cd Project-Dapp-master
   ```

2. Installez les dépendances backend :
   ```bash
   npm install
   ```

3. Installez les dépendances frontend :
   ```bash
   cd frontend
   npm install
   ```

## Déploiement du contrat

```bash
npx hardhat node
npx hardhat run ./ignition/modules/deploy.ts --network localhost
cd frontend
npm run dev
```

## Lancement de l'application

1. Démarrez le serveur de développement frontend :
   ```bash
   cd frontend
   npm run dev
   ```

2. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Tests

Pour exécuter les tests des contrats intelligents :
```bash
npx hardhat test
```

## Technologies utilisées

- **Solidity** : Langage pour les contrats intelligents.
- **Hardhat** : Framework de développement Ethereum.
- **Next.js** : Framework React pour le frontend.
- **Ethers.js** : Bibliothèque pour interagir avec Ethereum.
- **Tailwind CSS** : Framework CSS pour le style.

## Video du frontend

https://drive.google.com/drive/folders/1pDwa0dJBCKk-qcewLDBoeofvfr2Bmx2z?d


