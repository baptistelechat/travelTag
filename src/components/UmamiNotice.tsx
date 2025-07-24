import { Button } from "@/components/ui/button";
import { getUmamiConfig } from "@/lib/analytics";
import { Info, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export const UmamiNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const umamiConfig = getUmamiConfig();

  useEffect(() => {
    // Vérifier si Umami est activé et si l'utilisateur n'a pas encore donné son consentement
    const consentStatus = localStorage.getItem("umami-consent");

    // Afficher la notification si Umami est activé et qu'aucun consentement n'a été donné
    if (umamiConfig.isEnabled && !consentStatus) {
      setIsVisible(true);
    }
  }, [umamiConfig.isEnabled]);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem("umami-consent", "accepted");
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(
      new CustomEvent("umami-consent-changed", { detail: "accepted" })
    );
  };

  const handleRefuse = () => {
    setIsVisible(false);
    localStorage.setItem("umami-consent", "refused");
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(
      new CustomEvent("umami-consent-changed", { detail: "refused" })
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Drawer open={isVisible} onOpenChange={setIsVisible}>
      <DrawerContent>
        <DrawerHeader>
           <DrawerTitle className="flex items-center justify-center gap-2">
             <BarChart3 className="h-5 w-5" />
             Collecte de données anonymes
           </DrawerTitle>
           <DrawerDescription className="text-center">
             Nous utilisons Umami Analytics pour améliorer votre expérience
           </DrawerDescription>
         </DrawerHeader>

        <div className="px-4 pb-2">
          <Alert className="max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Ce site utilise Umami Analytics pour collecter des statistiques
              d'usage de base (pages visitées, clics sur les boutons). Aucune
              donnée personnelle n'est collectée.
            </AlertDescription>
          </Alert>
        </div>

        <DrawerFooter>
          <div className="flex gap-3 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={handleAccept}
              className="min-w-[120px]"
            >
              Accepter
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleRefuse}
              className="min-w-[120px]"
            >
              Refuser
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
