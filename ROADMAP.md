# 🧳 TravelTag – Roadmap

TravelTag est une application web permettant de générer des QR codes contenant des informations personnelles à imprimer et coller sur des bagages, sacs à dos, affaires d'enfants, etc. Pensé pour un usage personnel, il vise à devenir un outil public simple, offline et rassurant.

---

## ✅ Objectif MVP (POC solide)

### 1. 🎯 Formulaire d'informations

- ✅ Nom, prénom
- ✅ Adresse postale complète (rue, compléments, code postal, ville, pays)
- ✅ Nationalité
- ✅ Numéro de téléphone
- ✅ Email
- ✅ Modes de transport multiples (avion, train, voiture, bus, bateau)
- ✅ Aéroport/gare/station de départ avec autocomplétion
- ✅ Aéroport/gare/station d'arrivée avec autocomplétion
- ✅ Groupe sanguin
- ✅ Allergies et informations médicales
- ✅ Contacts de confiance (nom + téléphone)

### 2. 🧠 Validation (Zod)

- ✅ Contrôle de typage + valeurs requises

### 3. 📦 Génération du QR Code

- ✅ QRCode au format texte
- ✅ Aperçu dynamique
- Formats exportables :
  - ✅ PNG (via `html-to-image`)
  - PDF (grille ou version simple)

### 4. 🖨️ Export

- ✅ Mode impression (taille 1)
- ✅ Grille
- ✅ Export PNG haute qualité
- ✅ Styles d'impression optimisés
- ✅ Nom de l'app en petit footer

### 5. ⚙️ Stack technique

- ✅ Vite.js + React 18 + TypeScript
- ✅ Tailwind CSS v4 + Shadcn/UI
- ✅ Zustand pour le state management
- ✅ Zod pour la validation avec schémas TypeScript
- ✅ `react-qr-code` pour la génération des QR codes
- ✅ `html-to-image` pour l'export PNG
- ✅ Hooks personnalisés pour la logique métier

### 6. 🎉 Fonctionnalités bonus

- ✅ **Easter egg** : Intégration d'un Easter egg caché 🤫🐣
- ✅ **Autocomplétion** : Base de données d'aéroports, gares et pays
- ✅ **Architecture modulaire** : Composants réutilisables et typés
- ✅ **Validation avancée** : Schémas Zod pour tous les formulaires
- ✅ **UI/UX optimisée** : Accordéons, notifications toast, responsive design

---

## 💡 Idées "next steps" à court/moyen terme

### 🔐 Mode confidentiel

- Masquer certaines infos en clair
- QR contenant les infos, mais aperçu imprimé limité

### 🌍 Multi-langue (FR / EN / ES)

- Utilisation à l'international
- ✅ Normalisation des caractères accentués pour compatibilité internationale

### 📱 PWA / Offline-first

- Tout fonctionne hors ligne
- Ajout possible à l’écran d’accueil

### 🎨 Personnalisation visuelle

- Thèmes (ex : enfant, senior, randonneur)
- Couleurs du QR, image/logo au centre
- ⌛Logo et nom de l'utilisateur dans l’aperçu

### 🧑‍🍼 Mode enfant

- ✅ Contacts de confiance (parents/tuteurs)
- ✅ Groupe sanguin
- ✅ Allergies et informations médicales

---

## 🤯 Idées farfelues (mais possibles si le projet décolle)

### ☁️ Synchronisation facultative

- Liens courts (ex : traveltag.app/BP7A)
- Code QR dynamique (optionnelle)
- Édition des données après impression

### 📍 QR géolocalisé

- Possibilité de recevoir une position approximative du scan
- "Dernier scan : Gare de Lyon - Paris"

### 🧠 Mode "fiche santé" autonome

- ✅ Générer une fiche de santé d'urgence
- ✅ Ajouter ses informations médicales et allergies
- ✅ Ajouter son groupe sanguin
- ✅ Contacts de confiance pour urgences médicales
- ⌛ Ajouter traitement, nom du médecin (à venir)

### 🧳 Impression physique

- Intégration avec un service d'impression (type Stickermule ou Canva)
- Envoi de planche d'étiquettes à domicile

### 🤝 API publique

- Permettre à des ONG, établissements ou collectivités d’intégrer le service

---

## 🔓 Licence & publication

- Open Source (MIT ou GPL)
- ✅ Hébergement gratuit (Vercel / Netlify)
- ✅ Version 1 prévue pour usage perso offline, sans backend

---

## 🏁 Objectif de la V1 : ✅ "Créer mon QR bagage en 1 minute, sans compte et sans pub."

**🎉 MISSION ACCOMPLIE !** La version 1.0 de TravelTag est maintenant complète avec :
- ✅ Formulaire complet (transport, santé, contacts)
- ✅ Génération QR code instantanée
- ✅ Export PNG haute qualité
- ✅ Application 100% offline
- ✅ Interface intuitive et responsive
- ✅ Easter egg pour les curieux !

**Prochaine étape** : Déploiement public et collecte de retours utilisateurs pour la V2.
