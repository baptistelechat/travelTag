# 🧳 TravelTag – Roadmap

TravelTag is a web application for generating QR codes containing personal information to print and stick on luggage, backpacks, children's belongings, etc. Designed for personal use, it aims to become a simple, offline, and reassuring public tool.

---

## ✅ MVP Objective (Solid POC)

### 1. 🎯 Information Form

- ✅ First name, last name
- ✅ Complete postal address (street, additional info, postal code, city, country)
- ✅ Nationality
- ✅ Phone number
- ✅ Email
- ✅ Multiple transport modes (plane, train, car, bus, boat)
- ✅ Departure airport/station with autocomplete
- ✅ Arrival airport/station with autocomplete
- ✅ Blood type
- ✅ Allergies and medical information
- ✅ Emergency contacts (name + phone)

### 2. 🧠 Validation (Zod)

- ✅ Type checking + required values

### 3. 📦 QR Code Generation

- ✅ Text format QR Code
- ✅ Dynamic preview
- Exportable formats:
  - ✅ PNG (via `html-to-image`)
  - PDF (grid or simple version)

### 4. 🖨️ Export

- ✅ Print mode (size 1)
- ✅ Grid
- ✅ High-quality PNG export
- ✅ Optimized print styles
- ✅ App name in small footer

### 5. ⚙️ Technical Stack

- ✅ Vite.js + React 18 + TypeScript
- ✅ Tailwind CSS v4 + Shadcn/UI
- ✅ Zustand for state management
- ✅ Zod for validation with TypeScript schemas
- ✅ `react-qr-code` for QR code generation
- ✅ `html-to-image` for PNG export
- ✅ Custom hooks for business logic

### 6. 🎉 Bonus Features

- ✅ **Easter egg**: Hidden Easter egg integration 🤫🐣
- ✅ **Autocomplete**: Database of airports, stations, and countries
- ✅ **Modular architecture**: Reusable and typed components
- ✅ **Advanced validation**: Zod schemas for all forms
- ✅ **Optimized UI/UX**: Accordions, toast notifications, responsive design

---

## 💡 "Next Steps" Ideas for Short/Medium Term

### 🔐 Confidential Mode

- Hide certain information in plain text
- QR containing info, but limited printed preview

### 🌍 Multi-language (FR / EN / ES)

- International usage
- ✅ Accented character normalization for international compatibility

### 📱 PWA / Offline-first

- Everything works offline
- Possible addition to home screen

### 🎨 Visual Customization

- Themes (e.g.: child, senior, hiker)
- QR colors, image/logo in center
- ⌛User logo and name in preview

### 🧑‍🍼 Child Mode

- ✅ Emergency contacts (parents/guardians)
- ✅ Blood type
- ✅ Allergies and medical information

---

## 🤯 Wild Ideas (but possible if the project takes off)

### ☁️ Optional Synchronization

- Short links (e.g.: traveltag.app/BP7A)
- Dynamic QR code (optional)
- Data editing after printing

### 📍 Geolocated QR

- Possibility to receive approximate scan position
- "Last scan: Gare de Lyon - Paris"

### 🧠 Standalone "Health Card" Mode

- ✅ Generate emergency health card
- ✅ Add medical information and allergies
- ✅ Add blood type
- ✅ Emergency contacts for medical emergencies
- ⌛ Add treatment, doctor's name (coming soon)

### 🧳 Physical Printing

- Integration with printing service (like Stickermule or Canva)
- Home delivery of label sheets

### 🤝 Public API

- Allow NGOs, institutions, or communities to integrate the service

---

## 🔓 License & Publication

- Open Source (MIT or GPL)
- ✅ Free hosting (Vercel / Netlify)
- ✅ Version 1 planned for personal offline use, without backend

---

## 🏁 V1 Objective: ✅ "Create my luggage QR code in 1 minute, without account and without ads."

**🎉 MISSION ACCOMPLISHED!** TravelTag version 1.0 is now complete with:
- ✅ Complete form (transport, health, contacts)
- ✅ Instant QR code generation
- ✅ High-quality PNG export
- ✅ 100% offline application
- ✅ Intuitive and responsive interface
- ✅ Easter egg for the curious!

**Next step**: Public deployment and user feedback collection for V2.
