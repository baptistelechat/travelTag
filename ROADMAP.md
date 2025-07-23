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
- ✅ Aéroport/gare de départ
- ✅ Aéroport/gare d'arrivée
- ✅ Pathologie ou note santé
- ✅ Texte libre (ex : "contacter Marie en cas d'urgence")

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
- Grille de 3x3
- Repères de découpe
- ✅ Nom de l'app en petit footer

### 5. ⚙️ Stack technique

- ✅ Vite.js + React + TypeScript
- ✅ Tailwind CSS + Shadcn/UI
- ✅ Zustand pour le state
- ✅ Zod pour la validation
- ✅ `react-qr-code`

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
- Logo et nom de l'utilisateur dans l’aperçu

### 🧑‍🍼 Mode enfant

- Ajout contact parent
- Groupe sanguin
- ✅ Allergies (via le champ informations santé)

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

- Générer une fiche de santé d'urgence
- ✅ Ajouter ses informations médicales (via le champ informations santé)
- Ajouter son groupe sanguin, traitement, nom du médecin

### 🧳 Impression physique

- Intégration avec un service d'impression (type Stickermule ou Canva)
- Envoi de planche d'étiquettes à domicile

### 🤝 API publique

- Permettre à des ONG, établissements ou collectivités d’intégrer le service

---

## 🔓 Licence & publication

- Open Source (MIT ou GPL)
- Hébergement gratuit (Vercel / Netlify)
- ✅ Version 1 prévue pour usage perso offline, sans backend

---

## 🏁 Objectif de la V1 : ✅ "Créer mon QR bagage en 30 secondes, sans compte et sans pub."
