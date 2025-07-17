import { useTravelTagStore } from "@/lib/store";
import { type TravelInfo, travelInfoSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { User } from "lucide-react";
import type { Value as PhoneInputValue } from "react-phone-number-input";

export function TravelForm() {
  const { travelInfo, updateTravelInfo } = useTravelTagStore();

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
                          handleFieldChange("firstName", e.target.value);
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
                        handleFieldChange("phone", value?.toString() || "");
                      }}
                    />
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
                    <Input
                      placeholder="Paris CDG, Gare de Lyon, etc."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("departureLocation", e.target.value);
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
                        handleFieldChange("arrivalLocation", e.target.value);
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
                        handleFieldChange("additionalInfo", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
