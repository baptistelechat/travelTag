# 🧳 TravelTag

TravelTag est une application web permettant de générer des QR codes contenant des informations personnelles à imprimer et coller sur des bagages, sacs à dos, affaires d'enfants, etc. Pensé pour un usage personnel, il vise à devenir un outil public simple, offline et rassurant.

## 🚀 Fonctionnalités

- Formulaire d'informations personnelles avec validation
- Génération de QR code en temps réel
- Export en PNG et PDF (format simple ou grille 3x3)
- Application 100% offline - vos données restent sur votre appareil
- Interface responsive et intuitive

## 🔧 Technologies utilisées

- Vite + React + TypeScript
- Tailwind CSS v4
- Zustand pour la gestion d'état
- Zod pour la validation des formulaires
- react-qr-code pour la génération des QR codes
- @react-pdf/renderer pour l'export PDF
- html-to-image pour l'export PNG

## 🏁 Objectif

"Créer mon QR bagage en 30 secondes, sans compte et sans pub."

## 📋 Roadmap

Consultez le fichier [ROADMAP.md](./ROADMAP.md) pour découvrir les fonctionnalités prévues pour les prochaines versions.

## 🚀 Installation et démarrage

```bash
# Installation des dépendances
pnpm install

# Démarrage du serveur de développement
pnpm dev

# Construction pour la production
pnpm build
```

## 📝 Licence

Ce projet est sous licence MIT.
