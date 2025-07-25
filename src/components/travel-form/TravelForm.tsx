import { useTravelTagStore } from "@/lib/store";
import {
  type AccordionValue,
  AccordionValueEnum,
} from "@/lib/types/accordion-value.enum";
import { type TravelInfo } from "@/lib/types/travel-info.schema";
import { FormProvider, useForm } from "react-hook-form";

import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { User } from "lucide-react";
import { useState } from "react";

import {
  HealthInfoSection,
  LocationSection,
  PersonalInfoSection,
  TrustContactsSection,
} from "./sections";

export function TravelForm() {
  const { t } = useTranslation();
  const { travelInfo } = useTravelTagStore();
  const [accordionValue, setAccordionValue] = useState<AccordionValue[]>([
    AccordionValueEnum.PERSONAL_INFO,
  ]);

  const form = useForm<TravelInfo>({
    defaultValues: travelInfo,
  });

  return (
    <Card className="w-full max-w-md mx-auto md:mx-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5" />
          {t('qrCode.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Accordion
              type="multiple"
              className="w-full"
              value={accordionValue}
              onValueChange={(value) => {
                // Conversion des valeurs string[] en AccordionValue[]
                const typedValues = value.filter((val): val is AccordionValue =>
                  Object.values(AccordionValueEnum).includes(
                    val as AccordionValue
                  )
                );
                setAccordionValue(typedValues);
              }}
            >
              {/* Informations personnelles */}
              <PersonalInfoSection />

              {/* Lieux de départ et d'arrivée */}
              <LocationSection />

              {/* Informations de santé et complémentaires */}
              <HealthInfoSection />

              {/* Contacts de confiance */}
              <TrustContactsSection />
            </Accordion>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
