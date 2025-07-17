import { useTravelTagStore } from "@/lib/store";
import { type TravelInfo, travelInfoSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { FileText, Heart, Map, User } from "lucide-react";
import { useState } from "react";
import type {
  Country,
  Value as PhoneInputValue,
} from "react-phone-number-input";

export function TravelForm() {
  const { travelInfo, updateTravelInfo } = useTravelTagStore();
  const [accordionValue, setAccordionValue] = useState("personal-info");

  const form = useForm<TravelInfo>({
    resolver: zodResolver(travelInfoSchema),
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
              type="single"
              collapsible
              className="w-full"
              value={accordionValue}
              onValueChange={(value) => setAccordionValue(value)}
            >
              {/* Section 1: Informations personnelles */}
              <AccordionItem value="personal-info">
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

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <PhoneInput
                              placeholder="+33 6 12 34 56 78"
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
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 2: Lieux de départ et d'arrivée */}
              <AccordionItem value="location-info">
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
                      name="departureLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lieu de départ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Paris CDG, Gare de Lyon, etc."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange(
                                  "departureLocation",
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
                      name="arrivalLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lieu d'arrivée</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="New York JFK, Gare du Nord, etc."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange(
                                  "arrivalLocation",
                                  e.target.value
                                );
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

              {/* Section 3: Informations de santé et complémentaires */}
              <AccordionItem value="health-additional-info">
                <AccordionTrigger className="flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Informations de santé et complémentaires
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={form.control}
                      name="healthInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Informations santé (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Allergies, médicaments, etc."
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

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Informations complémentaires (optionnel)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Contacter Marie en cas d'urgence..."
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange(
                                  "additionalInfo",
                                  e.target.value
                                );
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
