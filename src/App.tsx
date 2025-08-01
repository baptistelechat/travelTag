import { TravelForm } from "@/components/travel-form/TravelForm";
import { QRCodeCard } from "./components/QRCodeCard";
import { QRCodeGrid } from "./components/QRCodeGrid";
import { UmamiNotice } from "./components/UmamiNotice";
import { UmamiScript } from "./components/UmamiScript";
import { usePrintHandler } from "./hooks/usePrintHandler";

function App() {
  // Utiliser le hook pour gérer l'impression via Ctrl+P
  usePrintHandler();

  return (
    <div className="min-h-svh bg-gray-50 py-8 px-4">
      {/* Script Umami Analytics */}
      <UmamiScript />
      {/* Overlay avec effet de flou pour l'impression */}
      <div id="print-overlay" className="print-overlay"></div>
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">🧳 TravelTag</h1>
        <p className="text-gray-600 mx-auto">
          Générez des QR codes pour vos bagages, sacs à dos, ou affaires
          d'enfants. Simple, rapide et sécurisé.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <TravelForm />
          <QRCodeCard />
        </div>
        {/* Conteneur de la grille de QR codes pour l'impression */}
        <div
          id="print-grid-container"
          className="hidden print-grid-container"
          style={{
            visibility: "hidden",
            display: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <QRCodeGrid />
        </div>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-gray-500">
        <UmamiNotice />
        <p>
          © TravelTag - Fonctionne 100% en local, aucune donnée personnelle
          n'est envoyée sur Internet.
        </p>
      </footer>
    </div>
  );
}

export default App;
