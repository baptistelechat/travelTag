import { useTravelFormField } from "@/hooks/useTravelFormField";
import { useTranslation } from "@/lib/i18n";
import { useTravelTagStore } from "@/lib/store";
import { AccordionValueEnum } from "@/lib/types/accordion-value.enum";
import { TransportModeEnum } from "@/lib/types/transport-mode.enum";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AirportSelector } from "@/components/ui/airport/airport-selector";
import { CitySelector } from "@/components/ui/city/city-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StationSelector } from "@/components/ui/station/station-selector";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Map, Plane, Train } from "lucide-react";

export function LocationSection() {
  const { t } = useTranslation();
  const { updateTravelInfo } = useTravelTagStore();
  const { form, handleFieldChange } = useTravelFormField();

  return (
    <AccordionItem value={AccordionValueEnum.LOCATION_INFO}>
      <AccordionTrigger className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <Map className="h-4 w-4" />
          {t("form.location.title")}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <FormField
            control={form.control}
            name="transportMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.location.transportMode")}</FormLabel>
                <FormControl>
                  <Tabs
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      updateTravelInfo({
                        transportMode:
                          value as (typeof TransportModeEnum)[keyof typeof TransportModeEnum],
                      });
                      // Réinitialiser les lieux de départ et d'arrivée
                      form.setValue("departureLocation", "");
                      form.setValue("arrivalLocation", "");
                      updateTravelInfo({
                        departureLocation: "",
                        arrivalLocation: "",
                      });
                    }}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value={TransportModeEnum.AIRPORT}
                        className="flex items-center gap-2"
                      >
                        <Plane className="h-4 w-4 hidden sm:block" />
                        {t("form.location.modes.airport")}
                      </TabsTrigger>
                      <TabsTrigger
                        value={TransportModeEnum.TRAIN}
                        className="flex items-center gap-2"
                      >
                        <Train className="h-4 w-4 hidden sm:block" />
                        {t("form.location.modes.train")}
                      </TabsTrigger>
                      <TabsTrigger
                        value={TransportModeEnum.CAR}
                        className="flex items-center gap-2"
                      >
                        <Car className="h-4 w-4 hidden sm:block" />
                        <span className="sm:hidden">
                          {t("form.location.modes.road")}
                        </span>
                        <span className="hidden sm:inline">
                          {t("form.location.modes.carBus")}
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departureLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.location.departureLocation")}</FormLabel>
                <FormControl>
                  {form.watch("transportMode") === TransportModeEnum.AIRPORT ? (
                    <AirportSelector
                      placeholder={t(
                        "form.location.placeholders.departureAirport"
                      )}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("departureLocation", value);
                      }}
                    />
                  ) : form.watch("transportMode") ===
                    TransportModeEnum.TRAIN ? (
                    <StationSelector
                      placeholder={t(
                        "form.location.placeholders.departureStation"
                      )}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("departureLocation", value);
                      }}
                    />
                  ) : (
                    <CitySelector
                      placeholder={t(
                        "form.location.placeholders.departureCity"
                      )}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("departureLocation", value);
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="arrivalLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.location.arrivalLocation")}</FormLabel>
                <FormControl>
                  {form.watch("transportMode") === TransportModeEnum.AIRPORT ? (
                    <AirportSelector
                      placeholder={t(
                        "form.location.placeholders.arrivalAirport"
                      )}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("arrivalLocation", value);
                      }}
                    />
                  ) : form.watch("transportMode") ===
                    TransportModeEnum.TRAIN ? (
                    <StationSelector
                      placeholder={t(
                        "form.location.placeholders.arrivalStation"
                      )}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("arrivalLocation", value);
                      }}
                    />
                  ) : (
                    <CitySelector
                      placeholder={t("form.location.placeholders.arrivalCity")}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("arrivalLocation", value);
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isRoundTrip"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div>
                  <FormLabel>{t("form.location.isRoundTrip")}</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      updateTravelInfo({ isRoundTrip: value });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
