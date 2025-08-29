import { TravelForm } from "@/components/travel-form/TravelForm";
import { QRCodeCard } from "./components/QRCodeCard";
import { QRCodeGrid } from "./components/QRCodeGrid";
import { UmamiNotice } from "./components/UmamiNotice";
import { UmamiScript } from "./components/UmamiScript";
import { LanguageSelector } from "@/components/ui/language/LanguageSelector";
import { useTranslation } from "@/lib/i18n";
import { usePrintHandler } from "./hooks/usePrintHandler";

function App() {
  // Utiliser le hook pour gérer l'impression via Ctrl+P
  usePrintHandler();
  
  // Hook de traduction
  const { t } = useTranslation();

  return (
    <div className="min-h-svh bg-gray-50 py-8 px-4">
      {/* Script Umami Analytics */}
      <UmamiScript />
      {/* Overlay avec effet de flou pour l'impression */}
      <div id="print-overlay" className="print-overlay"></div>
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold mb-2">{t('app.title')}</h1>
            <p className="text-gray-600 mx-auto">
              {t('app.description')}
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <LanguageSelector />
          </div>
        </div>
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
          {t('app.footer')}
        </p>
      </footer>
    </div>
  );
}

export default App;
