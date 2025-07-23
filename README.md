# 🧳 TravelTag

TravelTag est une application web permettant de générer des QR codes contenant des informations personnelles à imprimer et coller sur des bagages, sacs à dos, affaires d'enfants, etc. Pensé pour un usage personnel, il vise à devenir un outil public simple, offline et rassurant.

✨ **Version 1.0** : Application complète avec gestion des transports, informations de santé et contacts de confiance.

## 🚀 Fonctionnalités

### 📝 Informations personnelles
- Nom, prénom et nationalité
- Adresse postale complète (rue, compléments, code postal, ville, pays)
- Numéro de téléphone et email

### 🚗 Transport et voyage
- Modes de transport multiples (avion, train, voiture, bus, bateau)
- Aéroports, gares et villes avec autocomplétion
- Gestion des lieux de départ et d'arrivée

### 🏥 Santé et sécurité
- Groupe sanguin
- Allergies et informations médicales
- Contacts de confiance avec nom et téléphone

### 💻 Fonctionnalités techniques
- Génération de QR code en temps réel
- Export en PNG (format simple ou grille)
- Application 100% offline - vos données restent sur votre appareil
- Interface responsive et intuitive
- Validation complète des formulaires

## 🔧 Technologies utilisées

- **Frontend** : Vite + React 18 + TypeScript
- **Styling** : Tailwind CSS v4 + shadcn/ui
- **State Management** : Zustand
- **Validation** : Zod avec schémas TypeScript
- **QR Code** : react-qr-code
- **Export** : html-to-image pour PNG
- **Data** : Fichiers JSON pour aéroports, gares et pays
- **Hooks** : Hooks personnalisés pour la logique métier

## 🏁 Objectif

"Créer mon QR bagage en 1 minute, sans compte et sans pub."

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
