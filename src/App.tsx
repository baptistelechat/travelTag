import { PrintableView } from "@/components/PrintableView";
import { QRCodePreview } from "@/components/QRCodePreview";
import { TravelForm } from "@/components/TravelForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Printer } from "lucide-react";

function App() {
  return (
    <div className="min-h-svh bg-gray-50 py-8 px-4">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">🧳 TravelTag</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Générez des QR codes pour vos bagages, sacs à dos, ou affaires
          d'enfants. Simple, sécurisé et fonctionne hors ligne.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Informations & Aperçu
            </TabsTrigger>
            <TabsTrigger value="print" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Impression
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="form"
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <TravelForm />
            <QRCodePreview />
          </TabsContent>

          <TabsContent value="print" className="flex justify-center">
            <PrintableView />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-gray-500">
        <p>
          © TravelTag.app - Fonctionne 100% en local, aucune donnée n'est
          envoyée sur Internet.
        </p>
      </footer>
    </div>
  );
}

export default App;
