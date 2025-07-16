import { useTravelTagStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';

export function QRCodePreview() {
  const { travelInfo, qrCodeSize } = useTravelTagStore();

  // Création du contenu JSON pour le QR code
  const qrCodeData = JSON.stringify(travelInfo);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Aperçu du QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg flex flex-col items-center">
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
      </CardContent>
    </Card>
  );
}