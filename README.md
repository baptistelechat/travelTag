# 🧳 TravelTag

TravelTag is a web application for generating QR codes containing personal information to print and stick on luggage, backpacks, children's belongings, etc. Designed for personal use, it aims to become a simple, offline, and reassuring public tool.

✨ **Version 1.0**: Complete application with transport management, health information, and emergency contacts.

## 🚀 Features

### 📝 Personal Information
- First name, last name, and nationality
- Complete postal address (street, additional info, postal code, city, country)
- Phone number and email

### 🚗 Transport and Travel
- Multiple transport modes (plane, train, car, bus, boat)
- Airports, stations, and cities with autocomplete
- Departure and arrival location management

### 🏥 Health and Safety
- Blood type
- Allergies and medical information
- Emergency contacts with name and phone

### 💻 Technical Features
- Real-time QR code generation
- PNG export (simple format or grid)
- 100% offline application - your data stays on your device
- Responsive and intuitive interface
- Complete form validation

## 🔧 Technologies Used

- **Frontend**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand
- **Validation**: Zod with TypeScript schemas
- **QR Code**: react-qr-code
- **Export**: html-to-image for PNG
- **Data**: JSON files for airports, stations, and countries
- **Hooks**: Custom hooks for business logic

## 🏁 Objective

"Create my luggage QR code in 1 minute, without account and without ads."

## 📋 Roadmap

Check the [ROADMAP.md](./ROADMAP.md) file to discover the features planned for upcoming versions.

## 🚀 Installation and Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📝 License

This project is under MIT license.
