import { useTravelTagStore } from "@/lib/store";
import {
  type AccordionValue,
  type TravelInfo,
  AccordionValueEnum,
  TransportModeEnum,
} from "@/lib/types";
import { useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountrySelect } from "@/components/ui/country/country-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Car, FileText, Heart, Map, Plane, Train, User } from "lucide-react";
import { useState } from "react";
import type {
  Country,
  Value as PhoneInputValue,
} from "react-phone-number-input";
import { AirportSelector } from "./ui/airport/airport-selector";
import { AllergySelector } from "./ui/allergy/allergy-selector";
import { BloodGroupSelector } from "./ui/blood-group/blood-group-selector";
import { CitySelector } from "./ui/city/city-selector";
import { StationSelector } from "./ui/station/station-selector";
import { TrustContactsList } from "./ui/trust-contact/trust-contacts-list";

export function TravelForm() {
  const { travelInfo, updateTravelInfo } = useTravelTagStore();
  const [accordionValue, setAccordionValue] = useState<AccordionValue[]>([
    AccordionValueEnum.PERSONAL_INFO,
  ]);

  const form = useForm<TravelInfo>({
    defaultValues: travelInfo,
  });

  // Mise à jour du store à chaque changement validé
  const handleFieldChange = (field: keyof TravelInfo, value: string) => {
    // Mettre à jour le store même lorsque la valeur est vide
    updateTravelInfo({ [field]: value });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5" />
          Informations de voyage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
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
              {/* Section 1: Informations personnelles */}
              <AccordionItem value={AccordionValueEnum.PERSONAL_INFO}>
                <AccordionTrigger className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Informations personnelles
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Prénom"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange(
                                    "firstName",
                                    e.target.value
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nom"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange("lastName", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationalité</FormLabel>
                          <FormControl>
                            <CountrySelect
                              defaultCountry="FR"
                              value={field.value as Country}
                              onChange={(value) => {
                                field.onChange(value);
                                handleFieldChange(
                                  "nationality",
                                  value?.toString() || "FR"
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />

                    {/* Adresse postale */}
                    <div className="pt-2 pb-1">
                      <h3 className="text-sm font-medium">Adresse postale</h3>
                    </div>

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rue</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 rue de la Paix"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange("street", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addressDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Compléments d'adresse</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bâtiment A, Étage 3, Appartement 42"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange(
                                  "addressDetails",
                                  e.target.value
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="75000"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange(
                                    "postalCode",
                                    e.target.value
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Paris"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleFieldChange("city", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <CountrySelect
                              defaultCountry="FR"
                              value={field.value as Country}
                              onChange={(value) => {
                                field.onChange(value);
                                handleFieldChange(
                                  "country",
                                  value?.toString() || "FR"
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <PhoneInput
                              placeholder="06 12 34 56 78"
                              defaultCountry="FR"
                              international={false}
                              value={field.value as PhoneInputValue}
                              onChange={(value) => {
                                field.onChange(value);
                                handleFieldChange(
                                  "phone",
                                  value?.toString() || ""
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="exemple@email.com"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange("email", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 2: Lieux de départ et d'arrivée */}
              <AccordionItem value={AccordionValueEnum.LOCATION_INFO}>
                <AccordionTrigger className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Lieux de départ et d'arrivée
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={form.control}
                      name="transportMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mode de transport</FormLabel>
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
                                  <Plane className="h-4 w-4" />
                                  Aéroport
                                </TabsTrigger>
                                <TabsTrigger
                                  value={TransportModeEnum.TRAIN}
                                  className="flex items-center gap-2"
                                >
                                  <Train className="h-4 w-4" />
                                  Train
                                </TabsTrigger>
                                <TabsTrigger
                                  value={TransportModeEnum.CAR}
                                  className="flex items-center gap-2"
                                >
                                  <Car className="h-4 w-4" />
                                  Voiture / Bus
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
                          <FormLabel>Lieu de départ</FormLabel>
                          <FormControl>
                            {form.watch("transportMode") ===
                            TransportModeEnum.AIRPORT ? (
                              <AirportSelector
                                placeholder="Rechercher un aéroport de départ..."
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  handleFieldChange("departureLocation", value);
                                }}
                              />
                            ) : form.watch("transportMode") ===
                              TransportModeEnum.TRAIN ? (
                              <StationSelector
                                placeholder="Rechercher une gare de départ..."
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  handleFieldChange("departureLocation", value);
                                }}
                              />
                            ) : (
                              <CitySelector
                                placeholder="Rechercher une ville de départ..."
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
                          <FormLabel>Lieu d'arrivée</FormLabel>
                          <FormControl>
                            {form.watch("transportMode") ===
                            TransportModeEnum.AIRPORT ? (
                              <AirportSelector
                                placeholder="Rechercher un aéroport d'arrivée..."
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  handleFieldChange("arrivalLocation", value);
                                }}
                              />
                            ) : form.watch("transportMode") ===
                              TransportModeEnum.TRAIN ? (
                              <StationSelector
                                placeholder="Rechercher une gare d'arrivée..."
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  handleFieldChange("arrivalLocation", value);
                                }}
                              />
                            ) : (
                              <CitySelector
                                placeholder="Rechercher une ville d'arrivée..."
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
                            <FormLabel>Aller-retour ?</FormLabel>
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

              {/* Section 3: Informations de santé et complémentaires */}
              <AccordionItem value={AccordionValueEnum.HEALTH_ADDITIONAL_INFO}>
                <AccordionTrigger className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Informations de santé et complémentaires
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {/* Section Allergies */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                              <AllergySelector
                                value={field.value || []}
                                onChange={(value) => {
                                  field.onChange(value);
                                  updateTravelInfo({ allergies: value });
                                }}
                                placeholder="Sélectionner des allergies..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Groupe sanguin */}
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Groupe sanguin</FormLabel>
                          <FormControl>
                            <BloodGroupSelector
                              value={field.value || ""}
                              onChange={(value) => {
                                field.onChange(value);
                                handleFieldChange("bloodGroup", value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="healthInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Informations complémentaires</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Médicaments, conditions médicales, etc."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange("healthInfo", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 4: Contacts de confiance */}
              <AccordionItem value={AccordionValueEnum.TRUST_CONTACTS}>
                <AccordionTrigger className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contacts de confiance
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={form.control}
                      name="trustContacts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contacts de confiance</FormLabel>
                          <FormControl>
                            <TrustContactsList
                              contacts={field.value || []}
                              onChange={(value) => {
                                field.onChange(value);
                                updateTravelInfo({ trustContacts: value });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
