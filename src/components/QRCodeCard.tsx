import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { QrCode } from "lucide-react";
import { DownloadButtons } from "./DownloadButtons";
import { QRCodeDisplay } from "./QRCodeDisplay";

export function QRCodeCard() {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-md mx-auto md:mx-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          {t("qrCode.preview")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <div className="overflow-hidden">
          <QRCodeDisplay />
        </div>
        <div className="mt-4">
          <DownloadButtons />
        </div>
      </CardContent>
    </Card>
  );
}
