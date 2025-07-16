import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { DownloadButtons } from "./DownloadButtons";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { ToggleButtons } from "./ToggleButtons";

export function QRCodeCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Aperçu du QR Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ToggleButtons />
        <div className="mt-4">
          <QRCodeDisplay />
        </div>
        <div className="mt-4">
          <DownloadButtons />
        </div>
      </CardContent>
    </Card>
  );
}
