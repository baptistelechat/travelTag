import { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { useTravelTagStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function QRCodePreview() {
  const { travelInfo, qrCodeSize } = useTravelTagStore();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // Création du contenu JSON pour le QR code
  const qrCodeData = JSON.stringify(travelInfo);

  // Fonction pour télécharger le QR code en PNG
  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      toPng(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `traveltag-${travelInfo.lastName}-${travelInfo.firstName}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Erreur lors de la génération du PNG:', err);
        });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Aperçu du QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div 
          ref={qrCodeRef} 
          className="bg-white p-4 rounded-lg flex flex-col items-center"
        >
          {/* Nom et prénom au-dessus du QR code */}
          {(travelInfo.firstName || travelInfo.lastName) && (
            <div className="text-center mb-2 font-medium">
              {travelInfo.firstName} {travelInfo.lastName}
            </div>
          )}
          
          {/* QR Code */}
          <QRCode
            value={qrCodeData}
            size={qrCodeSize}
            level="M"
            className="mx-auto"
          />
          
          {/* Petit texte en bas */}
          <div className="text-xs text-gray-500 mt-2 text-center">
            TravelTag.app
          </div>
        </div>

        {/* Bouton de téléchargement */}
        <Button onClick={downloadQRCode} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Télécharger en PNG
        </Button>
      </CardContent>
    </Card>
  );
}